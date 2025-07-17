document.querySelector(".button-submit").addEventListener("click", function(e) {
    e.preventDefault();
  
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
  
    const reader = new FileReader();
    reader.onload = function(event) {
      const base64Image = event.target.result;
  
      const newProject = {
        title: document.getElementById("projectName").value,
        startDate: document.getElementById("startDate").value,
        endDate: document.getElementById("endDate").value,
        description: document.getElementById("description").value,
        duration: calculateDuration(
          document.getElementById("startDate").value,
          document.getElementById("endDate").value
        ),
        techs: Array.from(document.querySelectorAll("input[name='tech']:checked")).map(input => input.value),
        image: base64Image,
      };
  
      let projects = JSON.parse(localStorage.getItem("projects")) || [];
      projects.push(newProject);
      localStorage.setItem("projects", JSON.stringify(projects));
  
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Project berhasil disimpan!',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        // Tunggu timer selesai dulu
        document.querySelector("form").reset();
        window.location.href = "/pages/myproject.html";
      });
  
      
    };
  
    if (file) {
      reader.readAsDataURL(file);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Silakan pilih file gambar terlebih dahulu.',
      });
    }
  });
  
  function calculateDuration(start, end) {
    const s = new Date(start);
    const e = new Date(end);
    const days = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
    return days + " hari";
  }
  