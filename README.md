# D&D Inventory App

The D&D Inventory app is built using React for the frontend and Node.js/Express for the backend API. The application utilizes Redux for state management and Sequelize for database interaction. The entire app is containerized with Docker and deployed onto AWS Elastic Container Service using Terraform. The app provides a convenient platform for inventory management and lookup of weapons and items in the standard Dungeons and Dragons playbook.
<br>

![](https://github.com/ofelix60/inventory-app/blob/main/interface.gif)

<br>

## • Key Features

<br>
• React frontend with state management powered by Redux<br/>
• Node.js/Express backend API for data management and processing<br/>  
• Secure user authentication and authorization using JWT<br/> 
• Database integration with Postgres through the Sequelize ORM<br/>
• Containerization using Docker for easy deployment<br/>
• Deployment and infrastructure management using Terraform<br/>
• Continuous integration and deployment with GitHub Actions<br/>
• Automated testing using Jest<br/>
• Secure image storage in Github Container Registry<br/>
• Authorization and authentication using OpenID Connect (OIDC) between Github and AWS<br/>
<br>
<br>

## • Getting Started

To start using the D&D Inventory App, please follow these steps:

1. Clone the repository

`git clone https://github.com/ofelix60/inventory-app.git`

2. Install dependencies in the client and server folders

`npm install`

3. Build and run the project

(client)

`npm start`

(server)

`node server.js`

## • Contributing

If you have suggestions or improvements, please feel free to open a pull request or issue.
