<template>
  <div class="col-12">
    <div class="card p-3 shadow">
      <div class="card-body">
        <h5 class="card-title fw-semibold fs-3 mb-3">{{ formTitle }}</h5>
        <form @submit.prevent="" action="#" class="row g-3" novalidate>
          <div class="col col-lg-3" v-if="formType=='update'">
            <div class="form-floating">
              <input
                v-model="skill_id"
                type="text"
                class="form-control"
                id="skill_ID"
                placeholder="Skill ID"
                :class="{ 'is-invalid': errors.skill_id.state }"
                required
              />
              <label for="skill_ID">Skill ID</label>
              <div class="small text-danger" v-if="errors.skill_id.state">
                {{ errors.skill_id.message }}
              </div>
            </div>
          </div>
          <div class="col">
            <div class="form-floating">
              <input
                v-model="skill_name"
                type="text"
                class="form-control"
                id="skill_Name"
                placeholder="Skill Name"
                :class="{ 'is-invalid': errors.skill_name.state }"
                required
              />
              <label for="skill_Name">Skill Name</label>
              <div
                class="small text-danger"
                id="skill_name-feedback"
                v-if="errors.skill_name.state"
              >
                {{ errors.skill_name.message }}
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="fw-semibold fs-3">Attach to Courses</div>
            <div class="card shadow-sm mt-3" v-if="this.courses.length">
              <div class="card-body p-0">
                <table class="table table-sm table-hover mb-0">
                  <thead class="table-info bg-opacity-25">
                    <tr>
                      <th scope="col" class="ps-4">Course ID</th>
                      <th scope="col">Course Name</th>
                      <th scope=""></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="course in this.courses" :key="course.Course_ID">
                      <td class="ps-4">{{ course.Course_ID }}</td>
                      <td>{{ course.Course_Name }}</td>
                      <td class="text-end">
                        <button
                          @click="removeCourse(course.Course_ID)"
                          type="button"
                          class="btn badge text-bg-danger me-3"
                        >
                          <font-awesome-icon
                            icon="fa-solid fa-trash"
                            class="me-2"
                          />
                          remove
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-12">
            <button
              @click="addCourses()"
              type="button"
              class="btn btn-warning w-100 fw-semibold shadow-sm"
              id="add-skills-btn"
            >
              + Add Courses
            </button>
          </div>
          <div class="col-12" v-if="addCoursesForm">
            <div class="input-group">
              <div class="form-floating">
                <input
                  v-model="courseSearchInput"
                  type="search"
                  class="form-control"
                  id="skillInputText"
                  placeholder="Enter Skill"
                  @input="onQueryChangeSkill"
                />
                <label for="skillInputText"
                  >Search for a course name...</label
                >
              </div>
              <button
                class="btn btn-outline-primary"
                type="button"
                @click="viewAllCourses()"
              >
                <font-awesome-icon
                  icon="fa-solid fa-chevron-down"
                  class="me-2"
                  v-show="!this.viewAllCoursesVisible"
                />
                <font-awesome-icon
                  icon="fa-solid fa-chevron-up"
                  v-show="this.viewAllCoursesVisible"
                  class="me-2"
                />
                View All Courses
              </button>
            </div>
            <div class="col-12" v-if="errors.course.state">
              <div class="alert alert-danger" role="alert">
                {{ errors.course.message }} <b>{{ errors.course.details }}</b>
              </div>
            </div>

            <div v-if="this.searchCourse.length">
              Showing {{ this.searchCourse.length }} of
              {{ this.allCourses.length }}
            </div>
            <div v-if="this.searchCourse.length" class="card shadow-sm">
              <div class="card-body p-0">
                <table class="table table-sm table-hover mb-0">
                  <thead class="table-info bg-opacity-25">
                    <tr>
                      <th scope="col" class="ps-4">Course ID</th>
                      <th scope="col">Course Name</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody class="">
                    <tr
                      v-for="course in this.searchCourse"
                      :key="course.Course_ID"
                    >
                      <td class="ps-4">{{ course.Course_ID }}</td>
                      <td>{{ course.Course_Name }}</td>
                      <td class="text-end">
                        <button
                          @click="addCourse(course)"
                          type="button"
                          class="btn badge text-bg-primary me-3"
                        >
                          + Add
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="col-12 col-lg-3 text-center">
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#resetSkillInfoModal"
              id="reset-btn"
              class="btn btn-lg btn-light fw-semibold w-100 shadow-sm"
              style="text-decoration: none"
            >
              Reset
            </button>
          </div>
          <div class="col-12 col-lg-3" v-if="formType == 'update'">
            <button
              type="button"
              class="btn btn-lg btn-danger me-3 fw-semibold w-100 shadow-sm"
              id="delete-btn"
              data-bs-toggle="modal"
              data-bs-target="#deleteConfirmationModal"
            >
              Delete
            </button>
          </div>
          <div class="col-12 col-lg-6" v-if="formType == 'update'">
            <button
              type="submit"
              id="update-btn"
              class="btn btn-lg btn-primary me-3 fw-semibold w-100 shadow-sm"
              @click="formValidate('update')"
            >
              Update
            </button>
          </div>
          <div class="col-12 col-lg-9" v-if="formType == 'create'">
            <button
              type="submit"
              id="create-btn"
              class="btn btn-lg btn-success me-3 fw-semibold w-100 shadow-sm"
              @click="formValidate('create')"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Success Modal -->
  <Transition>
    <SuccessModal
      v-if="this.isModalVisible"
      @close="closeModal"
      @wheel.prevent
      @touchmove.prevent
      @scroll.prevent
      :modalTitle="this.modalTitle"
      :message="this.successModalMessage"
      :icon="this.modalIcon"
    />
  </Transition>

  <!-- form reset modal -->
  <div class="modal fade" tabindex="-1" id="resetSkillInfoModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Reset Skill information</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>
            This will reset Skill information to it's original state. Are you sure
            you want to reset Skill information?
          </p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            id="reset-close-btn"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-danger"
            data-bs-dismiss="modal"
            v-if="formType == 'update'"
            id="reset-update-btn"
            @click="resetSkillInfo()"
          >
            Reset
          </button>
          <button
            type="button"
            class="btn btn-danger"
            data-bs-dismiss="modal"
            id="reset-create-btn"
            @click="resetFormData()"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- delete confirmation modal  -->
  <div class="modal fade" tabindex="-1" id="deleteConfirmationModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete Skill</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>This will delete the selected skill, proceed?</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-danger"
            data-bs-dismiss="modal"
            @click="formValidate('delete')"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SuccessModal from "@/components/SuccessModal.vue";

export default {
  props: {
    formTitle: {
      type: String,
    },
    formData: {
      type: Object,
    },
    formType: {
      type: String,
    },
    allSkills: {
      type: Array,
    },
  },
  data() {
    return {
      allCourses: [],
      courseSearchInput: "",
      viewAllCoursesVisible: false,

      Skills: this.allSkills,

      // form data input
      skill_id: this.formData.skill_id,
      skill_name: this.formData.skill_name,
      courses: this.formData.courses,

      errors: {
        skill_id: {
          state: false,
          message: null,
          details: null,
        },
        skill_name: {
          state: false,
          message: null,
          details: null,
        },
        course: {
          state: false,
          message: null,
          details: null,
        },
      },

      // form data toggle
      addCoursesForm: false,

      // Modal
      isModalVisible: false,
      successModalMessage: "",
      modalIcon: "fa-solid fa-circle-check",
      modalTitle: "",
    };
  },
  methods: {
    onQueryChangeSkill() {
      this.errors.skill = {
        state: false,
        message: null,
        details: null,
      };
    },
    formValidate(submitType) {
      // reset error state
      this.resetErrorState();

      if (submitType == "update") {
        // check for form inputs

        // Skill id validation
        if (this.skill_id.length == 0) {
          this.errors.skill_id = {
            state: true,
            message: "Invalid Skill ID",
            details: this.skill_id,
          };
        } else {
          this.errors.skill_id = {
            state: false,
            message: "Valid Skill ID",
            details: this.skill_id,
          };
        }

        // Skill Name validation
        if (this.skill_name.length == 0) {
          this.errors.skill_name = {
            state: true,
            message: "Invalid Skill Name",
            details: this.skill_name,
          };
        } else {
          this.errors.skill_name = {
            state: false,
            message: "Valid Skill Name",
            details: this.skill_name,
          };
        }

        // course validation
        if (this.courses.length == 0) {
          this.errors.course = {
            state: true,
            message: "Invalid course, please select at least 1 course",
            details: null,
          };
        } else {
          this.errors.course = {
            state: false,
            message: "",
            details: null,
          };
        }

        // check if there's no error
        for (const errorType in this.errors) {
          if (this.errors[errorType].state) {
            return;
          }
        }

        console.log("sending put request...");

        // populate skill ID from front end
        let fromDataCourses = [];
        for (let course of this.courses) {
          fromDataCourses.push(course.Course_ID);
        }

         const formData = {
          Skill_ID: this.skill_id,
          Name: this.skill_name,
          Courses: fromDataCourses,
        };

        console.log(formData);

        // if alls good then send put request to backend
        const path = "http://127.0.0.1:5000/skills";

        axios
          .put(path, formData)
          .then((res) => {
            console.log(res);
            console.log("put request success");
            this.modalTitle = "Update Success";
            (this.modalIcon = "fa-solid fa-circle-check"),
              (this.successModalMessage =
                "Skill has been successfully updated!");
            this.showModal();
          })
          .catch((err) => {
            console.log(err);
            this.modalTitle = "Update Error";
            (this.modalIcon = "fa-solid fa-circle-xmark"),
              (this.successModalMessage =
                "Error! Unable to update skill! Duplicated Skill ID!");
            this.showModal();
          });
      } else if (submitType == "create") {


        // check for form inputs

        // Skill name validation
        if (this.skill_name.length == 0) {
          this.errors.skill_name = {
            state: true,
            message: "Invalid Skill Name",
            details: this.skill_name,
          };
        }

        // skill validation
        if (this.courses.length == 0) {
          this.errors.course = {
            state: true,
            message: "Invalid course, please select at least 1 course",
            details: null,
          };
        }

        // check if there's no error
        for (const errorType in this.errors) {
          // console.log(this.error.course)
          try {
            if (this.errors[errorType].state) {
              return;
            }
          } catch (err) {
            console.log(err);
          }
        }

        console.log("sending post request...");

        // populate skill ID from front end
        let formDataCourses = [];
        for (let course of this.courses) {
          formDataCourses.push(course.Course_ID);
        }

        const formData = {
          // Skill_ID: this.skill_id,
          Name: this.skill_name,
          Courses: formDataCourses,
        };

        // console.log(formData);

        // if alls good then send put request to backend
        const path = "http://127.0.0.1:5000/skills";
        console.log(path, formData);
        axios.post(path, formData)
            .then((res) => {
                console.log(res)
                console.log("put request success");
                this.modalTitle = 'Create Success'
                this.modalIcon = 'fa-solid fa-circle-check'
                this.successModalMessage = 'Skill has been successfully created!'
                this.showModal();
            })
            .catch((err) => {
                console.log(err);
                this.modalTitle = 'Create Error'
                this.modalIcon = 'fa-solid fa-circle-xmark',
                this.successModalMessage = 'Error! Unable to create skill! Skill ID already exists!'
                this.showModal()
            })
      } else {
        // delete Skill by sending delete request
        console.log("Deleting Skill " + this.skill_id);

        const path = "http://127.0.0.1:5000/skills/" + this.skill_id;
        axios
          .delete(path)
          .then((res) => {
            console.log(res);
            console.log("Delete success");
            this.modalTitle = "Delete Success";
            this.modalIcon = "fa-solid fa-user-plus";
            this.successModalMessage = "Skills has been successfully deleted!";
            this.showModal();
          })
          .catch((err) => {
            console.log(err);
            this.modalTitle = "Delete Error";
            (this.modalIcon = "fa-solid fa-circle-xmark"),
              (this.successModalMessage =
                "Error! Unable to delete Skill! please contact system developer");
            this.showModal();
          });
      }
    },
    resetErrorState() {
      this.errors = {
        skill_id: {
          state: false,
          message: null,
          details: null,
        },
        skill_name: {
          state: false,
          message: null,
          details: null,
        },
        course: {
          state: false,
          message: null,
          details: null,
        },
      };
    },
    resetFormData() {
      (this.skill_id = 0),
        (this.skill_name = ""),
        (this.courses = []),
        (this.courseSearchInput = "");
      this.addCoursesForm = false;
      this.resetErrorState();
    },
    resetSkillInfo() {
      // reset error state
      this.resetErrorState();

      this.Skills.filter((skill) => {
        if (skill.Skill_ID == this.skill_id) {
          this.skill_id = skill.Skill_ID;
          this.skill_name = skill.Name;
          this.skills = [...skill.Courses];
        }
      });
    },
    removeCourse(course_ID) {
      console.log(this.courses);

      for (let i = 0; i < this.courses.length; i++) {
        if (course_ID == this.courses[i].Course_ID) {
          this.courses.splice(i, 1);
          console.log(course_ID + "has been removed");
        }
      }
    },
    addCourses() {
      this.addCoursesForm = true;
      const path = "http://127.0.0.1:5000/courses";
      axios
        .get(path)
        .then((res) => {
          console.log("courses data loaded");
          this.allCourses = [...res.data.data];
        })
        .catch((err) => {
          console.log("Unable to retrieve courses from /courses");
          console.log(err);
          return;
        });
    },
    addCourse(course) {
      // reset skill error
      this.errors.course = {
        state: false,
        message: null,
        details: null,
      };

      // check if skills is already added
      for (const skillCourse of this.courses) {
        if (course.Course_ID == skillCourse.Course_ID) {
          this.errors.course = {
            state: true,
            message: "Unable to add existing course: ",
            details: course.Course_Name,
          };
          return false;
        }
      }

      // otherwise add skill
      this.courses.push(course);
    },
    viewAllCourses() {
      this.viewAllCoursesVisible = !this.viewAllCoursesVisible;

      if (this.viewAllCoursesVisible) {
        this.courseSearchInput = "All";
        return;
      }

      this.courseSearchInput = "";
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.$router.go();
    },
  },
  computed: {
    searchCourse() {
      if (this.courseSearchInput === "") {
        return [];
      } else if (this.courseSearchInput.toLowerCase() == "all") {
        return this.allCourses;
      }

      let matches = 0;

      return this.allCourses.filter((course) => {
        if (
          course.Course_Name.toLowerCase().includes(
            this.courseSearchInput.toLowerCase()
          ) &&
          matches < 10
        ) {
          matches++;
          return course;
        }
      });
    },
  },
  components: {
    SuccessModal,
  },
};
</script>

<style lang="scss" scoped></style>
