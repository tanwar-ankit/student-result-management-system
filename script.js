let students = [];
let student = {};
let table_data = document.getElementById("update-table");
let form = document.getElementById("myForm");
console.log(form);


form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("Submitted");
    let name = document.getElementById("s-name").value;
    let roll = document.getElementById("Roll-Number").value;
    let math = document.getElementById("math").value;
    let Physics = document.getElementById("Physics").value;
    let Chemistry = document.getElementById("Chemistry").value;
    let Hindi = document.getElementById("Hindi").value;
    let English = document.getElementById("English").value;
    let phone = document.getElementById("phone").value;
    let className = document.getElementById("className").value;


    student = {

        name: name,
        roll: roll,
        phone: phone,
        className: className,

        math: parseInt(math),
        Physics: parseInt(Physics),
        Chemistry: parseInt(Chemistry),
        Hindi: parseInt(Hindi),
        English: parseInt(English),



    };
    let duplicateStudent = students.some(function (s) {
        return s.roll === roll;
    });

    if (duplicateStudent) {
        alert("This Roll Number already exists!");
        return;
    }


    students.push(student);

    student.total = calculateStudent(student);

    student.percentage = student.total / 5;

    student.grade = calculate_grade(student);

    student.result = calculateResult(student);


    console.log(students);


    let data = JSON.stringify(students);

    localStorage.setItem("students", data);

    console.log("saved");

    table_data.innerHTML = "";
    renderStudents();
    update_dashboard();

});




let retrieve_data = localStorage.getItem("students");
students = JSON.parse(retrieve_data) || [];
console.log("retrieved");

renderStudents();
update_dashboard()



function calculateStudent(student) {

    return (
        student.math +
        student.Physics +
        student.Chemistry +
        student.Hindi +
        student.English
    );

}




function calculate_grade(student) {

    let percentage = student.total / 5;
    if ((student.Chemistry < 33 || student.English < 33 || student.Hindi < 33 || student.Physics < 33 || student.math < 33)) {
        return "--"
    }
    if (percentage >= 90 && percentage <= 100) {

        return "A+";

    }

    else if (percentage >= 80 && percentage < 90) {

        return "A";

    }

    else if (percentage >= 70 && percentage < 80) {

        return "B+";

    }

    else if (percentage >= 60 && percentage < 70) {

        return "B";

    }

    else if (percentage >= 50 && percentage < 60) {

        return "C";

    }

    else if (percentage >= 40 && percentage < 50) {

        return "D";

    }

    else if (percentage >= 33 && percentage < 40) {

        return "E";

    }

    else {

        return "Fail";

    }

}




function calculateResult(student) {

    let percentage = student.total / 5;
    if ((student.Chemistry < 33 || student.English < 33 || student.Hindi < 33 || student.Physics < 33 || student.math < 33)) {
        return "Fail"
    }
    if (percentage < 33) {

        return "Fail";

    }

    else {

        return "Pass";

    }

}






function renderStudents(studentList = students) {
    studentList.forEach(function (student, index) {

        let row = document.createElement("tr");
        let namecell = document.createElement("td");
        namecell.innerText = student.name;
        row.append(namecell);
        let rollcell = document.createElement("td");
        rollcell.innerText = student.roll;
        row.append(rollcell);
        let mathcell = document.createElement("td");
        mathcell.innerText = student.math;
        row.append(mathcell);
        let phycell = document.createElement("td");
        phycell.innerText = student.Physics;
        row.append(phycell);
        let chemcell = document.createElement("td");
        chemcell.innerText = student.Chemistry;
        row.append(chemcell);
        let hindicell = document.createElement("td");
        hindicell.innerText = student.Hindi;
        row.append(hindicell);
        let engcell = document.createElement("td");
        engcell.innerText = student.English;
        row.append(engcell);
        let totalcell = document.createElement("td");
        totalcell.innerText = student.total;
        row.append(totalcell);
        let gradecell = document.createElement("td");
        gradecell.innerText = student.grade;
        row.append(gradecell);
        let resultcell = document.createElement("td");
        resultcell.innerText = student.result;
        row.append(resultcell);



        let del_button = document.createElement("td");
        let button = document.createElement("button");
        button.type = "button";
        button.innerText = "Delete";
        del_button.append(button);
        row.append(del_button);
        table_data.append(row);

        button.addEventListener("click", function () {

            students = students.filter(function (s) {
                return s.roll !== student.roll;
            });

            localStorage.setItem(
                "students",
                JSON.stringify(students)
            );

            row.remove();

            update_dashboard();

            console.log("Row deleted successfully");
        });

    });



}
function update_dashboard() {
    let total_students = document.getElementById("total-students")
    total_students.innerHTML = students.length

    let passed_students = document.getElementById("passed-students")
    passed_students.innerHTML = students.filter(function (student) {
        return student.result == "Pass"
    }).length

    let failed_students = document.getElementById("failed-students")
    failed_students.innerHTML = students.filter(function (student) {
        return student.result == "Fail"
    }).length

    let average_perc = document.getElementById("average-percentage")
    let total = students.reduce(function (sum, student) {
        return sum + student.percentage
    }, 0)
    let average = total / students.length;
    average_perc.innerHTML = average;
}
let search_student = document.getElementById("search-student");

search_student.addEventListener("keydown", function (e) {

    if (e.key == "Enter") {

        let search = search_student.value.toLowerCase();

        if (search === "") {
            table_data.innerHTML = "";
            renderStudents();
            return;
        }

        let filtered_student = students.filter(function (student) {

            return (
                student.name.toLowerCase().includes(search) ||
                student.roll.toLowerCase().includes(search)
            );

        });

        table_data.innerHTML = "";

        renderStudents(filtered_student);
    }

});