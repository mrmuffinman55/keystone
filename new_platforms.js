// content-scripts/coursera.js
class CourseraExtractor {
  constructor() {
    this.platform = 'Coursera';
    this.selectors = this.getCourseraSelectors();
    this.init();
  }
  
  getCourseraSelectors() {
    return {
      courseTiles: ['.course-card', '.specialization-card'],
      courseTitle: ['h2 a', '.course-name'],
      // ... other selectors
    };
  }
}