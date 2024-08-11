import { Request, Response } from 'express';
import Course from '../models/Course';
import mongoose from 'mongoose';

// Criar um novo curso
export const createCourse = async (req: Request, res: Response) => {
    try {
      const { title, description, endDate, videos } = req.body;

      const newCourse = new Course({
        title,
        description,
        endDate,
        videos
      });
  
      await newCourse.save();
      res.status(201).json(newCourse);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        const errors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ message: errors });
      }
  
      res.status(500).json({ message: 'Erro ao criar o curso' });
    }
  };
  
// Obter todos os cursos cujo endDate ainda não passou
export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find({ endDate: { $gte: new Date() } });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving courses' });
  }
};

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find(); 
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving all courses' });
  }
};


// Atualizar um curso
export const updateCourse = async (req: Request, res: Response) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Curso não encontrado' });
    }

    res.json(updatedCourse);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: `Error updating course: ${errors.join(', ')}` });
    }

    res.status(500).json({ message: 'Erro ao atualizar o curso' });
  }
};

// Deletar um curso
export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Curso não encontrado' });
    }

    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar o curso' });
  }
};

