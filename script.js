var films = document.getElementsByClassName('film');

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

function setCookie(name, value, props) {

    props = props || {}

    var exp = props.expires

    if (typeof exp == "number" && exp) {

        var d = new Date()

        d.setTime(d.getTime() + exp*1000)

        exp = props.expires = d

    }

    if(exp && exp.toUTCString) { props.expires = exp.toUTCString() }

    value = encodeURIComponent(value)

    var updatedCookie = name + "=" + value

    for(var propName in props){

        updatedCookie += "; " + propName

        var propValue = props[propName]

        if(propValue !== true){ updatedCookie += "=" + propValue }
    }

    document.cookie = updatedCookie;

}

  function deleteCookie(name) {
    setCookie(name, "", {
      'max-age': -1
    })
  }

function checkboxSaving(){
    for (var i = 0; i < films.length; i++) {
        films[i].disabled = true;
        localStorage.setItem(films[i].name, films[i].checked);
        localStorage.setItem('disCheckbox', 'true');
    }
}

function checkboxRestart(){
    for (var i = 0; i < films.length; i++) {
        localStorage.removeItem(films[i].name);
        localStorage.setItem('disCheckbox', '');
        location.reload();
    }
}

for (var i = 0; i < films.length; i++) {
    if(localStorage.getItem('disCheckbox') == 'true'){
        films[i].disabled = true; 
    }else{
        films[i].disabled = false;
    }
    if (localStorage.getItem(films[i].name) == 'true') {
        films[i].checked = true;
    }else{
        films[i].checked = false;
    }
}

if(getCookie('city'))
    city.value = getCookie('city');
city.oninput = () => {
    setCookie('city', city.value, {'max-age': 3600});
    console.log(getCookie('city'));
};