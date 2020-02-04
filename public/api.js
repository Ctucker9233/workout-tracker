const API = {
  async getLastWorkout() {
    const res = await fetch("/api/workouts");
    const json = await res.json();
    console.log(json);
    return json[json.length - 1];
  },
  async addExercise(data) {
    console.log("Add Exercise Working", JSON.stringify(data))
    const id = location.search.split("=")[1];

    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    console.log("Response", res);

    const json = await res.json();

    return json;
  },
  async createWorkout(data) {
    const res = await fetch("/api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    return json;
  },

  async getWorkoutsInRange() {
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();
    
    return json;
  },
};
