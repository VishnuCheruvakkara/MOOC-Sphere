import privateAxios from "../api/privateAxios";
import publicAxios from "../api/publicAxios";

export const getCourses = async (search = '', page = 1) => {
    const response = await publicAxios.get(
        `/courses/all-courses/?search=${search}&page=${page}`
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
};

