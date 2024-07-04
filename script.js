    function maskPassword(pass) {  
        let str = ""
        for (let index = 0; index < pass.length; index++) {
            str += "*"
        }
        return str
       }

    function copyText(txt) {
        navigator.clipboard.writeText(txt).then(() => {
            document.getElementById("notification").style.display = "inline"
            setTimeout(() => {
                document.getElementById("notification").style.display = "none"
            }, 2000);
        }, () => {
            alert("Clipboard copying failed")
        });
      }

    const deletePassword = (website) => {
        let data = localStorage.getItem("passwords")
        let arr = JSON.parse(data);
        let arrUpdated = arr.filter((e) => {
            return e.website != website
        })
        localStorage.setItem("passwords", JSON.stringify(arrUpdated))
        alert(`Successfully deleted ${website}'s password`)
        showPasswords()
    
  }

    const showPasswords = () => {
        let tb = document.querySelector("table tbody")
        let data = localStorage.getItem("passwords")
        if (data == null || JSON.parse(data).length == 0) {
            tb.innerHTML = `<tr><td colspan="4">No Data To Show</td></tr>`
        } else {
            let arr = JSON.parse(data);
            let str = ""
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                str += `<tr>
                    <td>${element.website} <img onclick="copyText('${element.website}')" src="./copy.png" alt="Copy Button" width="10" height="10">
                    </td>
                    <td>${element.username} <img onclick="copyText('${element.username}')" src="./copy.png" alt="Copy Button" width="10" height="10">
                    </td>
                    <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="./copy.png" alt="Copy Button" width="10" height="10">
                    </td>
                    <td><button class="btnsm" onclick="deletePassword('${element.website}')">Delete</button></td>
                </tr>`
            }
            tb.innerHTML = str
        }
        document.getElementById("site").value = ""
        document.getElementById("user").value = ""
        document.getElementById("pass").value = ""
  }

    showPasswords()

    document.querySelector(".btn-submit").addEventListener("click", (e) => {
        e.preventDefault()
        let site = document.getElementById("site").value
        let user = document.getElementById("user").value
        let pass = document.getElementById("pass").value

        let passwords = localStorage.getItem("passwords")
        if (passwords == null) {
            let json = []
            json.push({ website: site, username: user, password: pass })
            alert("Password Saved");
            localStorage.setItem("passwords", JSON.stringify(json))
        } else {
            let json = JSON.parse(passwords)
            json.push({ website: site, username: user, password: pass })
            alert("Password Saved");
            localStorage.setItem("passwords", JSON.stringify(json))
        }
        showPasswords()
    })
