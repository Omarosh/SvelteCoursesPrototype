for (let i = 0; i < courses.length; i++) {
    if (tempCode !== courses[i].code) {
        continue;
    }

    for (let course of courses[i].prerequisites) {
        for (let j = 0; j < passedCourses.length; j++) {}
    }
}