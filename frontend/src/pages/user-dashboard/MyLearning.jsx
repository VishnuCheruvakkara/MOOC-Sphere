export default function MyLearning() {
  const courses = [
    {
      id: 1,
      title: "React Basics",
      description: "Learn components, props, and state from scratch.",
      progress: 40,
    },
    {
      id: 2,
      title: "Django REST API",
      description: "Build powerful backend APIs using Django.",
      progress: 70,
    },
    {
      id: 3,
      title: "System Design Basics",
      description: "Understand scalable architecture fundamentals.",
      progress: 10,
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-deep-lavender-500">
        My Learning
      </h1>

      <p className="text-sm text-soft-lavender-500 mt-1">
        Continue your learning journey
      </p>

      {/* Cards */}
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

            {/* Progress */}
            <div className="mt-4">
              <div className="w-full bg-butter-cream-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-deep-lavender-400"
                  style={{ width: `${course.progress}%` }}
                />
              </div>

              <p className="text-xs mt-2 text-soft-lavender-500">
                {course.progress}% completed
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}