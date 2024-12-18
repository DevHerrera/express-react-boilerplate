import React from "react";

export function showNotification() {
  const notification = document.getElementById("notification");

  if (!notification) {
    return;
  }

  notification.classList.remove("translate-x-full", "opacity-0");
  notification.classList.add("translate-x-0", "opacity-100");

  setTimeout(() => {
    notification.classList.remove("translate-x-0", "opacity-100");
    notification.classList.add("translate-x-full", "opacity-0");
  }, 3000);
}

const Notification = ({ text, color }: { text: string; color: string }) => {
  return (
    <div
      id="notification"
      className={`fixed top-4 right-4 bg-${color}-500 text-white px-4 py-2 rounded shadow-lg transform transition-transform translate-x-full opacity-0`}
    >
      {text}
    </div>
  );
};

export default Notification;
