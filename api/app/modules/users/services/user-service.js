import { User } from '../models'

export default {
	async create(data){
		try{
			return User.create(data);
		}catch(ex){
			throw new AppError({ status: 400, ...ex });
		}
	},
	async createMany(data){
		return User.insertMany(data)
	},
	async update(data, user){
		User.set(data);

		try {
			return user.save();
		} catch (e) {
			throw new AppError({ status: 400, ...e });
		}
	},
	async updateUser(data, user){
		user.set(data);

		try {
			return user.save();
		} catch (e) {
			throw new AppError({ status: 400, ...e });
		}
	},
	async updateOne(_id, data){
		return User.findOneAndUpdate({ _id }, { $set: data }, { new: true }).select({ __v: 0, password: 0 });
	},
	async find(params){
		return User.find(params).select({ createdAt: 0, password: 0, __v: 0 });
	},
	async getOne(query){
		return User.findOne(query).select({ __v: 0, password: 0, _id: 0 });
	},
	async findOne(phone){
		return User.findOne({ phone }).select({ __v: 0, password: 0 });
	},
	async findOneAndUpdate(data, params){
		return User.findOneAndUpdate(data, { $set: params }, { new: true }).select({ createdAt: 0, __v: 0 });
	},
	async remove(_id){
		return User.remove({ _id })
	}
}
