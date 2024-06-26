import { disconnectDb } from "../models/db.js";
import { createUser, setPassword } from "../models/user.js";

if (process.argv.length < 4) {
    console.log('Usage: createUser <username> <password>')
    process.exit(0)
}

const userName = process.argv[2]
const password = process.argv[3]

const user = await createUser({
    userName
})
console.log(await setPassword(user._id, password))

await disconnectDb();