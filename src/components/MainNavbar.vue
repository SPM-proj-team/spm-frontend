<template>
	<div class="container-fluid border-bottom border-success border-5 bg-white">
		<div class="container container-md-fluid">
			<div class="row">
				<div class="col">
					<nav class="navbar navbar-expand-lg my-4">
						<div
							class="logo text-teal-600 mx-3"
							@click="this.$router.push('/')"
							style="cursor: pointer"
						>
							LJPS
						</div>
						<button
							class="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContent"
							aria-controls="navbarSupportedContent"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span class="navbar-toggler-icon"></span>
						</button>
						<div
							class="collapse navbar-collapse justify-content-center"
							id="navbarSupportedContent"
						>
							<div class="input-group shadow-sm mb-3 mb-lg-0">
								<select
									class="form-select bg-light w-25"
									aria-label="Search dropdown"
									v-model="this.searchDropdown"
								>
									<option value="1" selected>Learning Journey</option>
									<option value="2">Roles</option>
								</select>
								
									<input
										type="search"
										class="form-control position-relative w-75"
										aria-label="Text input with dropdown button"
										placeholder="search....."
										v-model="this.searchInput"
									/>
									<template v-if="this.searchInput.trim().length > 0">
										<template v-if="this.searchDropdown == '1'">
											<div
												class="position-absolute top-100 start-50 translate-middle-x w-100 shadow"
												style="z-index: 99"
											>
												<ul
													class="list-group"
													v-for="(output, index) in this.searchOutput"
													:key="index"
												>
													<button
														class="list-group-item d-flex justify-content-between align-items-start"
														@click="this.goToLink(output)"
														
													>
														<div class="ms-2 me-auto">
															<div class="fw-bold">{{ output.Learning_Journey_Name }}</div>
															{{ output.Description }}
														</div>
														<span class="badge bg-primary rounded-pill"
															>{{ output.Courses.length }} Courses</span
														>
													</button>
												</ul>
											</div>
										</template>
										<template v-if="this.searchDropdown == '2'">
											<div
												class="position-absolute top-100 start-50 translate-middle-x w-100 shadow"
												style="z-index: 99"
											>
												<ul
													class="list-group"
													v-for="(output, index) in this.searchOutput"
													:key="index"
												>
													<button
														class="list-group-item d-flex justify-content-start align-items-start"
														@click="this.goToLink(output)"
													>
														<div class="ms-2 me-auto">
															<div class="fw-bold text-start">{{ output.Job_Role }}</div>
															Department: {{ output.Department }} | Job Title:
															{{ output.Job_Title }}
														</div>
													</button>
												</ul>
											</div>
										</template>
									</template>
								
							</div>
							<div></div>
							<div class="dropdown mx-lg-4">
								<button
									class="btn btn-secondary dropdown-toggle fw-semibold"
									type="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									{{ store.staff_FName }} {{ store.staff_LName }}
								</button>
								<ul class="dropdown-menu">
									<li @click="logout()"><a class="dropdown-item" href="#">Logout</a></li>
								</ul>
							</div>
						</div>
					</nav>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<nav class="navbar navbar-expand-sm">
						<div class="collapse navbar-collapse" id="navbarSupportedContent">
							<ul class="navbar-nav me-auto mb-2 mb-lg-0">
								<li class="nav-item border-end border-2 px-3">
									<router-link to="/" class="nav-link router-link" exact>
										<font-awesome-icon icon="fa-solid fa-house" class="me-2" />
										Home
									</router-link>
								</li>
								<li class="nav-item border-end border-2 px-3">
									<router-link to="/JobRoles" class="nav-link router-link" exact>
										<font-awesome-icon icon="fa-solid fa-user" class="me-2" />
										View Roles
									</router-link>
								</li>
								<li
									class="nav-item px-3"
									:class="{ 'border-end border-2': checkAdmin() }"
								>
									<router-link
										to="/CreateLearningJourney"
										class="nav-link router-link"
										exact
									>
										<font-awesome-icon icon="fa-solid fa-plus" class="me-2" />
										Create Learning Journey
									</router-link>
								</li>
								<li v-if="checkAdmin()" class="nav-item px-3">
									<router-link to="/Admin" class="nav-link router-link" exact>
										<font-awesome-icon icon="fa-solid fa-circle-user" class="me-2" />
										Admin
									</router-link>
								</li>
							</ul>
						</div>
					</nav>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { userStore } from "@/store";

export default {
	setup() {
		const store = userStore();
		return { store };
	},
	data() {
		return {
			searchDropdown: 1,
			searchInput: "",
			searchOutput: [],
		};
	},
	methods: {
		checkAdmin() {
			if (this.store.role == "Admin") {
				return true;
			}
			return false;
		},
		logout() {
			(this.store.staff_FName = ""),
				(this.store.staff_LName = ""),
				(this.store.email = ""),
				(this.store.role = ""),
				(this.store.staff_id = null),
				(this.store.department = "");
			this.$router.push("/Login");
		},
		goToLink(output){
			if (this.searchDropdown == 1) {
				this.$router.push('/LearningJourney/' + output.Learning_Journey_ID) 

			}

			if (this.searchDropdown == 2) {
				this.$router.push('/JobRoles/' + output.Job_ID) 
			}

			this.searchInput= ''

		}
	},
	watch: {
		searchInput: async function () {
			if (this.searchInput.trim().length > 0) {
				if (this.searchDropdown == 1) {
					// get user's learning journey
					await this.store.getLearningJourney();

					if (
						this.searchInput.toLowerCase().trim().length !== 0 &&
						this.store.learningJourneys.length > 0
					) {
						this.searchOutput = this.store.learningJourneys.filter(
							(learningJourney) =>
								learningJourney.Learning_Journey_Name.toLowerCase()
									.trim()
									.includes(this.searchInput.toLowerCase().trim())
						);
					}
				}
			}

			if (this.searchDropdown == 2) {
				// get user's learning journey
				await this.store.getRoles();

				if (
					this.searchInput.toLowerCase().trim().length !== 0 &&
					this.store.jobRoles.length > 0
				) {
					this.searchOutput = this.store.jobRoles.filter((jobRole) =>
						jobRole.Job_Role.toLowerCase()
							.trim()
							.includes(this.searchInput.toLowerCase().trim())
					);
				}
			}

			return false;

			// } else if (type == 2) {

			// } else if (type == 3) {
			// } else if (type == 4) {
		},
		searchDropdown: function () {
			this.searchInput = "";
		},
	},

	pops: {
		isLoggedIn: String,
	},
};
</script>

<style scoped>
.nav-item {
	font-size: 18px;
	letter-spacing: 0.5px;
}

.router-link-active {
	font-weight: bold;
}
</style>
