import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './pages/loginPage';
import StudentTable from './pages/studentManagement';
import { BrowserRouter, Route, Routes } from 'react-router';
import Add_Student from './components/addStudent';
import UpdateStudent from './components/updateStudent';
import TeacherTable from './pages/teacherManagement';
import Update_Teacher from './components/updateTeacher';
import Add_Teacher from './components/addTeacher';
import Add_Attendance from './components/addAttendance';
import PrivateRoute from './components/privateRoute';
import AdminPage from './pages/adminPage';
import TeacherPage from './pages/teacherPage';
import StudentMarksView from './components/studentMarksView';
import AddStudentMarks from './components/addStudentMarks';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<PrivateRoute />}>


          <Route path="/studentManagement" element={<StudentTable />} />
          <Route path="/studentManagement/addStudent" element={<Add_Student />} />
          <Route path="/studentpage/:studet_id" element={<StudentMarksView />} />
          <Route path="/studentManagement/updateStudent/:student_id" element={<UpdateStudent />} />
          <Route path="/teacherManagement" element={<TeacherTable />} />
          <Route path="/teacherManagement/addteacher" element={<Add_Teacher />} />
          <Route path="/teacherManagement/updateTeacher/:teacher_id" element={<Update_Teacher />} />
          <Route path="/addAttendance" element={<Add_Attendance />} />
          <Route path="/adminPage" element={<AdminPage />} />
          <Route path="/teacherPage/:teacher_id" element={<TeacherPage />} />
          <Route path="/teacherPage/:class_id/:teacher_id/:subject_id" element={<AddStudentMarks />} />


        </Route>

        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>

    </BrowserRouter>

  );
}

export default App
