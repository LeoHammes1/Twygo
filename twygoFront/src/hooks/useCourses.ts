import { useState, useEffect } from 'react';
import api from '../api/api';
import { ICourse } from '../interfaces/course';

export const useAllCourses = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await api.get<ICourse[]>('/courses/all');
        if (isMounted) {
          setCourses(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError('Erro ao carregar cursos');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCourses();

    return () => {
      isMounted = false;
    };
  }, []);

  const addCourse = async (course: Omit<ICourse, '_id'>) => {
    try {
      const response = await api.post<ICourse>('/courses', course);
      setCourses((prevCourses) => [...prevCourses, { ...response.data, id: response.data._id }]);
    } catch (err) {
      setError('Erro ao adicionar curso');
    }
  };

  const updateCourse = async (_id: string, updatedCourse: Partial<ICourse>) => {
    try {
      await api.put(`/courses/${_id}`, updatedCourse);
      setCourses((prevCourses) =>
        prevCourses.map((course) => (course._id === _id ? { ...course, ...updatedCourse } : course))
      );
    } catch (err) {
      setError('Erro ao atualizar curso');
    }
  };

  const deleteCourse = async (_id: string) => {
    try {
      await api.delete(`/courses/${_id}`);
      setCourses((prevCourses) => prevCourses.filter((course) => course._id !== _id));
    } catch (err) {
      setError('Erro ao deletar curso');
    }
  };

  return { courses, loading, error, addCourse, updateCourse, deleteCourse };
};

export const useCourses = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await api.get<ICourse[]>('/courses');
        if (isMounted) {
          setCourses(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError('Erro ao carregar cursos');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCourses();

    return () => {
      isMounted = false;
    };
  }, []);

  return { courses, loading, error };
};
