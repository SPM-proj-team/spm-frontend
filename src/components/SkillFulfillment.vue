<template>
	<div class="card shadow" >
		<div class="card-body">
			<h5 class="card-title fw-bold mb-3">Skills Fulfillment</h5>
			<div
				class="card-subtitle mb-1 text-muted d-flex justify-content-start align-items-start"
			>
				<h6 class="me-2">
					<font-awesome-icon icon="fa-solid fa-lightbulb" />
					{{ countSkillsMapped() }} / {{ Skills.length }} Skill<template
						v-if="countSkillsMapped() > 1"
						>s</template
					>
					Mapped
				</h6>
				<span class="card-subtitle text-muted">|</span>
				<h6 class="me-auto ms-2">
					<font-awesome-icon icon="fa-solid fa-book" class="mx-1" />
					{{ SelectedCourses.length }} Course<template
						v-if="SelectedCourses.length > 1"
						>s</template
					>
				</h6>
			</div>
			<div class="progress">
				<div
					class="progress-bar"
					role="progressbar"
					aria-label="Example with label"
					:style="{ width: getSkillProgress() + '%' }"
					:aria-valuenow="getSkillProgress()"
					aria-valuemin="0"
					v-if="getSkillProgress()"
					aria-valuemax="100"
				>
					{{ getSkillProgress() }}%
				</div>
			</div>
		</div>
		<ol class="list-group list-group-numbered list-group-flush">
			<li
				class="list-group-item d-flex justify-content-between align-items-start"
				v-for="Skill in Skills"
				:key="Skill.Skill_ID"
			>
				<div class="ms-2 me-auto w-100">
					<div class="d-flex justify-content-start">
						<div class="fw-semibold me-2">
							{{ Skill.Name }}
						</div>
						<div
							v-if="countCoursesPerSkill(Skill.Skill_ID) > 0"
							class="badge badge-pill bg-success"
						>
							{{ countCoursesPerSkill(Skill.Skill_ID) }} course<template
								v-if="countCoursesPerSkill(Skill.Skill_ID) > 1"
								>s</template
							>
						</div>
					</div>
					<template
						v-for="course in MappedCourses"
						:key="course.Course_ID + '_' + Skill.Skill_ID"
					>
						<div v-if="course.Skill_ID == Skill.Skill_ID">
							<div class="card bg-light border-info b-0 me-3 mb-3 w-80 mt-3">
								<div class="card-body">
									<h6 class="card-title fw-semibold">
										{{ course.Course_ID }} - {{ course.Course_Name }}
									</h6>
									<div class="card-subtitle small">
										<button
											class="btn btn-sm btn-link"
											type="button"
											data-bs-toggle="collapse"
											:data-bs-target="
												'#collapse' + course.Course_ID + '_' + Skill.Skill_ID
											"
											aria-expanded="false"
											aria-controls="collapseExample"
										>
											<font-awesome-icon icon="fa-solid fa-chevron-down" class="ms-2" />
											More details
										</button>
										<div
											class="collapse"
											:id="'collapse' + course.Course_ID + '_' + Skill.Skill_ID"
										>
											<div class="card card-body w-100 border-0">
												<div><b>Course Status:</b> {{ course.Course_Status }}</div>
												<div>
													<b>Registration Status:</b>
													{{ mapRegistration(course.Course_ID, "registration") }}
												</div>
												<div>
													<b>Completion Status:</b>
													{{ mapRegistration(course.Course_ID, "completion") }}
												</div>
                                                <hr/>
												{{ course.Course_Desc }}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</template>
				</div>
			</li>
		</ol>
		<button
			v-if="formType == 'create'"
			class="btn btn-primary rounded-0 rounded-bottom fw-bold"
			type="button"
			@click="$emit('createLearningJourney')"
			:disabled="getSkillProgress() == 0"
		>
			Create Learning Journey
		</button>
		<button
			v-if="formType == 'createFromViewRole'"
			class="btn btn-primary rounded-0 rounded-bottom fw-bold"
			type="button"
			data-bs-toggle="modal"
			data-bs-target="#ljInfoModal"
			:disabled="getSkillProgress() == 0"
		>
			Create Learning Journey
		</button>
	</div>
</template>

<script>
export default {
	props: {
		Skills: Object,
		MappedCourses: Object,
		SelectedCourses: Array,
		courseRegistration: Object,
		formType: {
			type: String,
		},
	},

	data() {
		return {
			errors: {
				skills: {
					state: false,
					message: "",
					details: "",
				},
			},
		};
	},
	methods: {
		countCoursesPerSkill(Skill_ID) {
			var courseCounter = 0;
			for (var Course of this.MappedCourses) {
				if (Course.Skill_ID == Skill_ID) {
					courseCounter++;
				}
			}

			return courseCounter;
		},

		getSkillProgress() {
			return Math.round((this.countSkillsMapped() / this.Skills.length) * 100);
		},

		countSkillsMapped() {
			var skillsCounter = {};

			for (var Course of this.MappedCourses) {
				if (Course.Skill_ID in skillsCounter) {
					skillsCounter[Course.Skill_ID]++;
				} else {
					skillsCounter[Course.Skill_ID] = 0;
				}
			}

			return Object.keys(skillsCounter).length;
		},

		openModalForLJInfo() {
			this.$parent.openModalForLJInfo();
		},

		mapRegistration(courseID, type) {
			if (type === "registration") {
				for (let registration of this.courseRegistration) {
					if (registration.Course.Course_ID === courseID) {
						return registration.Reg_Status;
					}
				}

				return "Not Registered";
			} else if (type === "completion") {
				for (let registration of this.courseRegistration) {
					if (registration.Course.Course_ID === courseID) {
						return registration.Completion_Status;
					}
				}

				return "Not Completed";
			}
		},
	},
	emits: ["createLearningJourney"],
};
</script>

<style scoped>
.btn-link {
	color: black;
	text-decoration: none;
}
</style>
