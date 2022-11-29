exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    // userInfo has some structure
    // Given some value for userInfo, write a test that asserts our HTTP response is correct
    // userInfo = {'user_a': {'signed_up': true}, 'user_b': {'signed_up': false}}
    // assert that our response has the proper JSON structure

    const userInfo = await users.findAll({
      where: {
        uuid: id,
      },
    });

    response_data = createGetUserByIdResponse(userInfo);

    return res.status(200).json({
      success: true,
      user: userInfo,
    });
  } catch (error) {
    console.log(error.message);
  }
};

/*
  really not javascipt code - just to share idea
  "mock" or "override" users.findAll function
  function mockUsersFindAll() {
    # don't call sequelize, just return some dummy data in the right format
    return 'user_a': {'is_signed_up': true}, 'user_b': {'is_signed_up': false}} 
  }
  # Pretend that our mocking library provides a mock function that we can use to change the meaning of users.findAll
  users.findAll = mock(mockUsersFindAll)
  getUserById()
  */
//

// def testCreateGetUserByIdReponse() {

// }

function createGetUserByIdResponse(userInfo) {
  return { success: true, user: userInfo };
}

// function testCreateGetUserByIdReponse() {
//   const userInfo = {'user_a': {'is_signed_up': true}, 'user_b': {'is_signed_up': false}}
//   assert createGetUserByIdResponse(user(userInfo)).has_key('success') === True

// }
