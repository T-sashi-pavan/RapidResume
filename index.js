document.addEventListener('DOMContentLoaded', () => {
    const generateResumeButton = document.getElementById('generateResume');
    
    if (generateResumeButton) {
        generateResumeButton.addEventListener('click', () => {
            const fullName = document.getElementById('fullName').value;
            const github = document.getElementById('github').value;
            const linkedin = document.getElementById('linkedin').value;
            const phone = document.getElementById('phone').value;
            const address = document.getElementById('address').value;
            const summary = document.getElementById('summary').value;

            const educationField = document.getElementById('education');
            const educationDetails = educationField.value.split('\n').map(detail => {
                const [school, duration] = detail.split(','); // Assuming each line is in "School Name, Duration" format
                return `
                    <div class="education-item">
                        <div class="school">${school.trim()}</div>
                        <div class="duration">${duration ? duration.trim() : ''}</div>
                    </div>
                `;
            }).join('');

            const projects = document.getElementById('projects').value.split('\n').map(item => `<li>${item}</li>`).join('');
            const skills = document.getElementById('skills').value.split('\n').map(item => `<li>${item}</li>`).join('');
            const certifications = document.getElementById('certifications').value.split('\n').map(item => `<li>${item}</li>`).join('');
            const internships = document.getElementById('internships').value.split('\n').map(item => `<li>${item}</li>`).join('');
            const activities = document.getElementById('activities').value.split('\n').map(item => `<li>${item}</li>`).join('');

            const resumeHTML = `
                <h1>${fullName}</h1>
                <div class="contact-info">
                    <p>${github}</p>
                    <p>${linkedin}</p>
                    <p>${phone}</p>
                    <p>${address}</p>
                </div>
                <hr>
                <h3>Summary</h3>
                <p>${summary}</p>
                <hr>
                <h3>Education</h3>
                <div id="educationDisplay">${educationDetails}</div>
                <hr>
                <h3>Projects</h3>
                <ul>${projects}</ul>
                <hr>
                <h3>Technical Skills</h3>
                <ul>${skills}</ul>
                <hr>
                <h3>Certifications</h3>
                <ul>${certifications}</ul>
                <hr>
                <h3>Internships</h3>
                <ul>${internships}</ul>
                <hr>
                <h3>Extra Curriculum Activities</h3>
                <ul>${activities}</ul>
                <hr>
            `;

            // Save the resume data to localStorage
            localStorage.setItem('resumeData', resumeHTML);

            // Navigate to the resume page
            window.location.href = 'resume.html';  // Navigate to a new page
        });
    }

    // Ensure that the resume content is displayed on the resume.html page
    if (window.location.href.includes('resume.html')) {
        const resumeHTML = localStorage.getItem('resumeData');
        if (resumeHTML) {
            document.getElementById('resume').innerHTML = resumeHTML;
        } else {
            document.getElementById('resume').innerHTML = "<p>No resume data found. Please go back and generate a resume.</p>";
        }
    }

    // Download PDF functionality
    const downloadButton = document.getElementById('download');
    if (downloadButton) {
        downloadButton.addEventListener('click', () => {
            const element = document.getElementById('resume');
            const opt = {
                margin: 1,
                filename: 'resume.pdf',
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            // Use html2pdf.js library to generate the PDF
            html2pdf().set(opt).from(element).save();
        });
    }
});
