export default function Courses() {
  const courses = [
    {
      id: 1,
      title: "React Basics",
      description: "Learn components, props, and state from scratch.",
      level: "Beginner",
    },
    {
      id: 2,
      title: "Django REST API",
      description: "Build powerful backend APIs using Django.",
      level: "Intermediate",
    },
    {
      id: 3,
      title: "System Design Basics",
      description: "Understand scalable architecture fundamentals.",
      level: "Advanced",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-deep-lavender-500">
        Courses
      </h1>

      <p className="text-sm text-soft-lavender-500 mt-1">
        Choose a course to start learning
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="p-4 rounded-xl bg-soft-lavender-200 hover:bg-soft-lavender-300 transition cursor-pointer"
          >
            <h2 className="text-lg font-semibold text-deep-lavender-500">
              {course.title}
            </h2>

            <p className="text-sm mt-2 text-soft-lavender-500">
              {course.description}
            </p>

            <span className="inline-block mt-3 text-xs px-2 py-1 rounded bg-light-violet-200 text-deep-lavender-500">
              {course.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}