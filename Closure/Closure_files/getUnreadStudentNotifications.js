const element = document.getElementById("notification-badge");
const HERMES_API_URL =
  window.location.hostname === "ebooks-test.cpm.org"
    ? "https://node-ms-test.cpm.org"
    : "https://hermes.cpm.org";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const getUnreadNotifications = async () => {
  const cookie = getCookie("cpm-sso-token");

  try {
    const notifications = await fetch(HERMES_API_URL + "/api/student/studentAlert", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + cookie,
      },
    });

    const data = await notifications.json();
    const unarchivedAlerts = data.filter((alert) => alert.isArchived === false);
    if (unarchivedAlerts.length) element.textContent = unarchivedAlerts.length;
    
    return;
  } catch (error) {
    return console.log(error);
  }
};

getUnreadNotifications();
