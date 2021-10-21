import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'
import uniqueValidator from 'mongoose-unique-validator'

mongoose.plugin(uniqueValidator)

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		trim: true,
		required: 'First name is required'
	},
	lastName: {
		type: String,
		trim: true,
		required: 'Last name is required'
	},
	role: {
		type: String,
		required: 'Role is required',
		enum: ['admin', 'user'],
		trim: true,
		lowercase: true
	},
	phone: {
		type: String,
		validate: [ /^[0-9+]{10,}$/, `Invalid phone number`],
		required: 'Phone is required',
		trim: true,
		unique: 'Phone must be a unique'
	},
	password: {
		type: String,
		validate: [ /^[a-zA-Z0-9@_-]{8,32}$/, `Password must contain the following "[a-zA-Z0-9@_-] and must be minimum 8 character"`],
		required: 'Password is required',
		trim: true
	},
	privileges: {
		user: {
			insert: {
				type: Boolean,
				default: false
			},
			update: {
				type: Boolean,
				default: false
			},
			get: {
				type: Boolean,
				default: false
			},
			delete: {
				type: Boolean,
				default: false
			}
		}
	},
	creator: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			default: null
		},
		date: {
			type: Date,
			default: null
		},
	},
	avatar: {
		type: String,
		default: null
	},
	active: {
		type: Boolean,
		default: false
	}
}, { timestamps: true });

UserSchema.statics.createFields = [ 'firstName', 'lastName', 'password', 'phone', 'privileges', 'role' ];

UserSchema.pre('save', function(next){
	if (this.isModified('password')) {
		const salt = bcrypt.genSaltSync(10);
	
		this.password = bcrypt.hashSync(this.password, salt);
	}
	
	next();
});

UserSchema.methods.comparePasswords = function(password){
	return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('user', UserSchema);
