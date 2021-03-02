import Board from "../board/Board";
import Status from "../board/Status";
import Task from "../board/Task";

export default class DateOfCalendar {
  #monthBelongTo;
  #yearBelongTo;
  #number;
  #monthNumber;
  #yearNumber;
  #taskRepository = [];

  constructor(dateNumber, monthObject, yearObject) {
    this.#monthBelongTo = monthObject;
    this.#yearBelongTo = yearObject;
    this.#number = dateNumber;
    this.#yearNumber = yearObject.getNumber();
    this.#monthNumber = monthObject.getNumber();
  }

  getDateNumber() {
    return this.#number;
  }

  getDateObject() {
    return new Date(this.#yearNumber, this.#monthNumber, this.#number);
  }

  getAllTasks() {
    this.sortTasks();
    return this.#taskRepository;
  }

  sortTasks() {
    this.#taskRepository.sort((task1, task2) => {
      const statusList = Status.getRepository();
      const index1 = statusList.indexOf(task1.getStatus().getText());
      const index2 = statusList.indexOf(task2.getStatus().getText());
      return index1 - index2;
    });
  }

  addTask(content) {
    const newTask = new Task(content, this);
    this.#taskRepository.push(newTask);
  }

  deleteTask(task) {
    const taskIndex = this.#taskRepository.indexOf(task);
    this.#taskRepository.splice(taskIndex, 1);
  }

  deleteAllTasks() {
    this.#taskRepository = [];
  }

  getTaskLength() {
    return this.#taskRepository.length;
  }

  handleClicked() {
    if (!Board.getVisibility()) {
      Board.display(this);
      return;
    }
    if (Board.isDateSameWithPreviousDate(this)) {
      Board.hide();
      return;
    }
    Board.display(this);
  }
}
