'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          uuid: '0ff86bf9-8d3c-483f-a8fe-e5fe72f15347',
          username: 'testUsername',
          email: 'test@test.com',
          password: 'passwordtest',
          createdAt: '2022-12-06T20:11:38.524Z',
          updatedAt: '2022-12-06T20:11:38.524Z',
        },
        {
          id: 1,
          uuid: 'fb4a4c3a-2dee-4311-b1f2-da8a9e55330e',
          username: 'username',
          email: 'user@test.com',
          password:
            '$2a$10$MdyVeL3t1Q13T0DTEvV1SuFw7G8NqsnYLtGKAvMybzOTmEGwS5kR2',
          createdAt: '2022-09-05T01:01:39.772Z',
          updatedAt: '2022-09-05T01:01:39.772Z',
          inventoryId: null,
        },
        {
          id: 11,
          uuid: '5b85fa7f-061a-4971-be59-66cb7bf154ed',
          username: 'demo',
          email: 'demo@demo.com',
          password:
            '$2a$10$E7QbSgpFuS10oTCoOSek8uTZ0nqVlgBUA7eZ65jL6xiGksqN1HCKm',
          createdAt: '2022-09-06T18:05:12.944Z',
          updatedAt: '2022-09-06T18:05:12.944Z',
          inventoryId: null,
        },
        {
          id: 12,
          uuid: 'c65bd047-5414-4b7a-b5a3-36c1ec4d0587',
          username: 'nerd',
          email: 'oscar@test.com',
          password:
            '$2a$10$8/FL5MkUJ59sBVxKt7YU0udK8FYsOqvmqT/4fPIFy98WqqLDGNZ1O',
          createdAt: '2022-09-06T20:04:03.205Z',
          updatedAt: '2022-09-06T20:04:03.205Z',
          inventoryId: null,
        },
      ],
      {}
    );
  },

  async down(queryInterface, DataTypes) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
