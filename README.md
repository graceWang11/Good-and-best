# Good-and-best
#Youtube Instruction of set up
#https://www.youtube.com/watch?v=bTY0fa8p8D0&t=337s
#Convex setup: 
#login to the convex, create a new project called 021 each team memeber need to has this project in their own account

#Node.js Set up Instruction:
#https://nextjs.org/docs/getting-started/installation
#CD to where the project stored, In the terminal Type : 
## npx create-next-app@latest
#Graph instruction: 
![image](https://github.com/user-attachments/assets/ff4e7783-9997-41bf-8ab7-45543a14f9c7)

#Next step : 
#Convex next.js set up : 
#https://docs.convex.dev/quickstart/nextjs
##Open new terminal direct to the project that you setup for the next.js 
#Graph Instruction: 
![image](https://github.com/user-attachments/assets/cdc34547-c005-42c8-8ff5-1d8d309bf294)
#Enter "npm install convex"
#Waite till it's installed then Type npx convex dev 
#Choose 'exsiting project' -> '021' wait till it's configured
#Graph Instruction: 
![image](https://github.com/user-attachments/assets/ed044c7c-d498-49cf-8b3f-aff2c1887a9d)
#WANRNING : DO NOT CLOSE THIS TERMINAL ! 

#next step Install clerk user authentication : 
#Open a new terminal to cd to the project 
#Type 'npm install @clerk/nextjs'
#Open another terminal type 'code .' to open the project in the VSCode
#Graph Instruction:
![image](https://github.com/user-attachments/assets/bdacdf42-7d34-4414-b868-db18df5b8cce)

#Next step : google Clerk and login by using Goodandbest google account 
#User credencial: 
#Username: goodandbestteam@gmail.com
#Password: good1234best
#Check if your .env.local has this API keys
#NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cG9ldGljLWNhcmlib3UtNzkuY2xlcmsuYWNjb3VudHMuZGV2JA
#CLERK_SECRET_KEY=sk_test_omtTI5RpaItqyX96r0INTFrEPrw4IlslnoxSRSwWq9
#Graph Instruction :
![image](https://github.com/user-attachments/assets/c26d3fcd-5713-43ea-ac5e-ca6e71557552)
#Open the Terminal which has command 'npm install @clerk/nextjs'
#Type 'npm run dev ' to satrt the program 
#Check Your files , make sure it has middleware.ts file under src folder
#Now enter localhost:3000 , you should be able to see the clerk login page for the project
//probelms : 
// if you can't see the login page once you enter localhost:3000
//check for the convex/auth.config.ts
//check the domain credetial if's follow by the clerk JWT template/convex => issuer 
// if's the same, double check if the middleware.ts is under the folder src 
//Double check the .env.local file make sure you have copied or enter the right keys
//First login select => Google => goodandbest@gmail.com
//Then you will be able to see this page :
![image](https://github.com/user-attachments/assets/712d724d-e6c3-4c0f-9666-dd2f848f05b9)

##WANRING : WHILE YOUR APPLICATION(WEB) RUNS , DONT CLOSE THE TERMINAL 
## FOR EACH TIME, YOUWANNA TO RESTART THE WHOLE APPLICATION, CLOSE THE TERMINAL AND THE LOCALHOST 3000
## FOR NEXT TIME RUNS , Command: 'npm run dev' TO START THE WHOLE PROGRAM 

#Node.js setup and version 
#Open terminal , cd to the project 
#type 'npm install convex dotenv'
#MAKE SURE WE ALL HAVE THE SAME npm,nvm, Node.js version 
//To check each of your versions, type -v at the end of each 
#Graph instruction :
![image](https://github.com/user-attachments/assets/7018b28e-c7bb-4ee7-ad63-26a73f2444d6)
#To connect with convex 
//Open terminal and type 'npx convex dev' and wait till it's connect 


#week 1 
#TODO: Vercel account/ clerk account /Stripe account 
#TODO: Template for the badminton shopping website 
#TODO: Database For the website 
#TODO: UML for the databse 
#TODO: Set up all the components need for the project 

