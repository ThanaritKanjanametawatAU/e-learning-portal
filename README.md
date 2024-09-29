# E-Learning Website (1/2024 Web Application Development Project 2)

## Owner: [Thanarit Kanjanametawat](https://github.com/ThanaritKanjanametawatAU) ID:6410322 Section:543

### Visit Website at: [E-Learning Portal](https://portal-elearning.vercel.app)

### Demonstration Video: [E-Learning Portal Demonstration](https://youtu.be/U4HKc0Acc0k)

## Important Notice
- Local Storaage Credentials are broken right now, so please don't click refresh, will fix that after being graded.


### Overview
#### This is a website for learning management. The user can register/login as teacher or student.
#### Teacher can create/update/delete course.
#### Student can view course content.



### Features
#### 1. Register/Login Page
![Register](/screenshots/general/register.png)
- Let the user enter their name, email, and password to register.
- Login for returning users.

#### 1.1 Your First Time Here?
![Choose Role](/screenshots/general/chooserole.png)
- Let the user choose their role (Teacher/Student)
- Redirect to the respective page after choosing the role.
- Teacher and student have different abilities.
<br><br><br>


#### 2. Home Page
![Home](/screenshots/general/home.png)
- A Welcome message to the user.
- A button to browse all courses.
- A button to Logout.
- A button to to Switch View (Teacher/Student) in case something went wrong.

<br><br><br>

#### 3.  Profile Page
![Profile](/screenshots/general/profile.png)
- See the user's name and role.
<br><br><br>



#### 4. Browse All Courses page

4.1 Teacher's Course Browsing
![Teacher's Course Browsing](/screenshots/teacher/browse.png)
- See all courses in the database.
- Can edit or delete course.
- Can create new course.
<br><br>


4.2 Student's Course Browsing
![Student's Course Browsing](/screenshots/student/browse.png)
- Can view all courses in the database.
- Can't edit or delete course.
<br><br><br>



#### 5. Teacher's Special Page

5.1 Create Course
![Create Course](/screenshots/teacher/create.png)
- Let the teacher create a new course.
- By entering the course name, course description, course content as an ariticle.
- The course will be added to the course list in the Browse All Courses page.
<br><br>

![Created and Deleted Course](/screenshots/teacher/createddeleted.png)
- created "Cool Course"
- deleted "Some Course"
<br><br><br>


5.2 Edit Course
![Edit Course](/screenshots/teacher/editting.png)
- Let the teacher edit the course details.
<br><br>

![Edited Course](/screenshots/teacher/edited.png)
- Edited "Spanish Course"


<br><br><br>

#### 6. Student's Special Page

6.1 View Course Content
![View Course Content](/screenshots/student/viewlesson.png)
- Let the student view the course content.
<br><br>





### Technologies
- Frontend: NextJS
- Backend: MongoDB, Mongoose, NextAuth

### How to run
1. Clone this repository:<br>
`git clone https://github.com/ThanaritKanjanametawatAU/e-learning-portal.gitt`
<br><br>
2. Go to the project directory:<br>
`cd e-learning-portal`
<br><br>
3. Install dependencies:<br>
`pnpm install`
<br><br>
4. Create .env.local file and add the following:<br>
`MONGODB_URI=`<br>
`NEXT_PUBLIC_API_BASE=`

4. Run the project:<br>
`pnpm run dev`
<br><br>
5. Open your browser and navigate to `http://localhost:3000`
