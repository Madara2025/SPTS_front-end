import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './pages/loginPage';
import StudentTable from './pages/studentManagement';
import { BrowserRouter, Route, Routes } from 'react-router';
import Add_Student from './components/addStudent';
import Update_Student from './components/updateStudent';
import TeacherTable from './pages/teacherManagement';
import Update_Teacher from './components/updateTeacher';
import Add_Teacher from './components/addTeacher';
import Add_Attendance from './components/addAttendance';
import Add_Marks from './components/addMarks';
import PrivateRoute from './components/privateRoute';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<PrivateRoute />}>

          <Route path="/studentManagement" element={<StudentTable />} />
          <Route path="/studentManagement/addStudent" element={<Add_Student />} />
          <Route path="/studentManagement/updateStudent" element={<Update_Student />} />
          <Route path="/teacherManagement" element={<TeacherTable />} />
          <Route path="/teacherManagement/addteacher" element={<Add_Teacher />} />
          <Route path="/teacherManagement/addstudent" element={<Update_Teacher />} />
          <Route path="/addAttendance" element={<Add_Attendance />} />
          <Route path="/addMarks" element={<Add_Marks />} />

        </Route>

        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>

    </BrowserRouter>

  );
}

export default App
