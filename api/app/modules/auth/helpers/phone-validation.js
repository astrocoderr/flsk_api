export default (phone) => {
    const validation = /^\+[0-9]{12}$/
    const passed = validation.test(phone)

    if(!passed){
        return 0
    }

    return 1
}