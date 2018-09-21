let loginbox = document.getElementById('loginbox');
let glassfield = document.getElementById('glassfield');

document.getElementById('loginl').addEventListener('click', () => {
    loginbox.style.display = 'block';
    glassfield.style.display = 'block';
});

document.getElementById('loginclose').addEventListener('click', () => {
    loginbox.style.display = 'none';
    glassfield.style.display = 'none';
});

document.querySelectorAll('.navbar li').forEach((elem) => {
    console.log(elem);
    elem.addEventListener('click', () => {
        document.querySelectorAll('.navbar li').forEach((elem) => {
            elem.classList.remove('active');
        });
        elem.classList.add('active');
    });
});
