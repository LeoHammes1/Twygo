import { Router } from 'express';
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
} from '../controllers/courseController';

const router = Router();

router.get('/courses', getCourses);
router.post('/courses', createCourse);
router.get('/courses/all', getAllCourses);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);

export default router;
