var data = {
  users: [ 
    {
      id: 'u001',
      first_name: 'Rub',
      last_name: 'Duckey',
      email_address: 'rub_duckey@duckfarm.com',
      user_name: 'rub_duckey',
      recipes: data.recipes,
      saved_recipies: ['r001'],
      picture: 'u001.jpg'
    }
  ],
  recipes: [
    {
      id: 'r001',
      title: 'Pizza Rice',
      ingriedients: ['brown rice', 'lentils', 'peperoni', 'mozarella cheese', 'salt', 'pepper'],
      directions: [
        'Put equal parts of brown rice and lentils in rice cooker',
        'Add salt and pepper',
        'Cook rice and lentils',
        'Serve rice',
        'Add peperoni and cheese'
      ],
      likes: 999,
      pictures: ['r001-1.jpg', 'r001-2.jpg'],
      tags: ['pizzarice', 'pizzaricelovers', 'pizzariceparty'],
      creator: 'u001'
    }
  ]
}

data.getUser = (userName) => {
  return new Promise(function (resolve, reject) { 
    setTimeout(() => {
      var result = data.users.filter(x => x.user_name === userName).pop() || 'No User Found in Dummy DB'
      resolve(result);
      reject('Unexpected Dummy DB Error');
    }, 300);
  });
}

data.insertUser = (userData) => {
  return new Promise(function (resolve, reject) { 
    setTimeout(() => {
      data.users.push(userData)
      resolve("Insert OK");
      reject('Unexpected Dummy DB Error');
    }, 300);
  });
}

module.exports = data;

data.getRecipes = (userName) => {
  return new Promise(function (resolve, reject) { 
    setTimeout(() => {
      var userId = data.users
        .filter(x => x.user_name === userName) // Get single item array of profile information.
        .pop() // Get item [0] from the array
        .id  //return the ID Field
        || 'User not found in Database'
      console.log(userId)
      var recipes = data.recipes
        .filter(x => x.creator === userId) //Get All recipies that match user ID
      console.log(recipes)
      resolve(recipes);
      reject('Unexpected Dummy DB Error');
    }, 300);
  });
}


