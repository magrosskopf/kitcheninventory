import bcrypt from 'bcrypt';

export async function hash(value: string): Promise<string> {
    const saltRounds = 10;
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
          if (err) return reject(err);
          bcrypt.hash(value, salt, (err, hash) => {
            if (err) return reject(err);
            resolve(hash);
          });
        });
      });
}

export async function compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
    const result = await bcrypt.compare(plainPassword, hashedPassword); 
    console.log("result", result);
    
    return result
}