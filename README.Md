# What is Workflow?
Workflow is "The last tool you'll ever need to make your business run smoothly".
It offers unrivalled financial and operational insight to your business and gives you the tools to make informed decisions to steer your business in the right direction.
Built with knowledge from:
- Job Management Software,
- Accounting Software,
- Devops Software;

and bundles everything neatly together in one package. 

# How can workflow make you money?
Workflow offers a hosting solution which serves a version of the software. The hosting solution generates revenue by means of non-invasive 3rd party advertising services (Free Tiers). It also offers paid tiers which remove ads, and provide application support. Contributing to the project entitles you to a "slice of the pie". The more you contribute, the bigger the slice 😉.

# How can you get involved?
Do you have knowledge in any of the following?:
- Front end:
    - React (javascript)
    - React-Admin
    - Axios
- Back end:
    - nodejs
    - Mongoose / MongoDB
    - express

Then, register to become a contributor using your github account at _______ Once registered, take a look at the Projects or Issues section, implement or fix anything you want, and submit a pull request when you're done, it's that simple 😊

# How do you ask for help?
Reach out via email: workflowsoftwaredev@gmail.com

# Installation
1. Clone the git repoxitory
2. Configure envirionment variables
- in the 'client' directory:
    1. Create a `.env` file
    2. Use the below template. You will need to know how to configure, and generate keys for the necessary services, but you can ask for help if you get stuck
        ```
        VITE_PUBLIC_API_HOST=
        ```
- In the 'server' directory:
   1. Create a `.env` file
    2. Use the below template. You will need to know how to configure, and generate keys for the necessary services, but you can ask for help if you get stuck
        ```
        # MongoDB Database settings
        APP_DATABASE_NAME=
        APP_DATABASE_USER=
        APP_DATABASE_URL=c
        APP_DATABASE_PASS=

        # Expiry Settings
        APP_EXPIRY_REGISTRATION_KEY_MINUTES=
        ``` 
3. open 2 terminals in the project directory.
- From the first terminal:
    1. `cd client`
    2. `npm install`
    3. `npm run dev`
- From the second terminal:
    1. `cd server`
    2. `npm install`
    3. `npm run dev`