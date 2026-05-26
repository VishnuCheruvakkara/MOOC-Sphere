import privateAxios from "../api/privateAxios";
import publicAxios from "../api/publicAxios";

export const getCourses = async (search = '', page = 1, myCourse=false) => {
    const response = await publicAxios.get(
        `/courses/all-courses/?search=${search}&page=${page}&my_course=${myCourse}`
    );
    return response.data;
};

export const getLatestFourCourses = async () => {
    const response = await publicAxios.get('/courses/all-courses/?limit=4');

    return response.data;
};

export const getCourseDetail = async (courseId) => {
    const response = await privateAxios.get(`/courses/all-courses/${courseId}/`);
    return response.data;
};;

export const markLessonVisited = async (lessonId) => {
    const response = await privateAxios.post(
        `/courses/lessons/${lessonId}/visit/`
    );
    return response.data;
};

export const enrollCourse = async (courseId) => {
    return privateAxios.post(`/courses/all-courses/${courseId}/enroll/`);
};