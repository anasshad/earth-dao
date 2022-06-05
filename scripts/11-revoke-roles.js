import sdk from './1-initialize-sdk.js'

const token = sdk.getToken('0x8f33Ac1470bE338d73e6a8367649f02ba3A39c68');

(async () => {
  try{
  const roles = await token.roles.getAll();
  console.log('Roles: ', roles);
    await token.roles.setAll({
      admin: [],
      minter: []
    })
    console.log('Roles after revoking: ', await token.roles.getAll())
    console.log('Successfully revoked minter and admin roles');
  } catch (err){
    console.error('Failed to revoke roles: ', err);
  }
  
  
} )()