# D&D Inventory App

The D&D Inventory app is built using React for the frontend and Node.js/Express for the backend API. The application utilizes Redux for state management and Sequelize for database interaction. The entire app is containerized with Docker and deployed onto AWS Elastic Container Service using Terraform. The app provides a convenient platform for inventory management and lookup of weapons and items in the standard Dungeons and Dragons playbook.
<br>
<br>
![](https://github.com/ofelix60/inventory-app/blob/main/demo.gif)

## **Key Features**

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

## **Getting Started**

To start using the D&D Inventory App locally, please follow these steps:

1. Clone the repository

`git clone https://github.com/ofelix60/inventory-app.git`

2. Run the following command

`docker-compose -f docker-compose.dev.yml up`

## **Testing**

Testing runs as a part of the build process.

To run all tests manually, you can use the following command:

`npx jest --coverage`

## **Infrastructure**

My cloud infrastructure was created and managed using Terraform. It consists of two services that run on Amazon Elastic Container Service (ECS) using the AWS Fargate launch type. The services are defined by task definitions that include the Docker image for the service, the required resources (CPU/memory), and the environment variables needed by the containers.

Incoming traffic to the services is distributed using a Load Balancer (ALB), ensuring that the traffic is balanced and the services are highly available. The services are deployed in Virtual Private Cloud (VPC) subnets, providing enhanced security and network control.

![](https://github.com/ofelix60/inventory-app/blob/main/diagram.png)

## **CI/CD**

<br>

**Build Workflow:**

I have implemented Github Actions to manage my CI/CD pipeline for my project. The build process starts by checking out the latest code version, followed by building two images of the app. To ensure I can revert to a previous version if needed, I tag each version of the built image. Finally, I save the newly built image on Github's container registry for future use.

**Deploy Workflow:**

In order to run the deploy workflow, I have set up OpenId Connect (OIDC) to provide the necessary permissions for Github Actions. The process involves obtaining a JWT from the Github OIDC provider and requesting a temporary access token from the IAM identity provider. To apply my code, I use Terraform and store the Terraform state in an S3 bucket that serves as the backend. This setup allows me to manage the deployment process efficiently and securely.

![](https://github.com/ofelix60/inventory-app/blob/main/oidc.png)

## **Contributing**

If you have suggestions or improvements, please feel free to open a pull request or issue.
