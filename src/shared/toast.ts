export class Toast {
  constructor(message: string, type: "error" | "success") {
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.classList.add(type);
    toast.textContent = message;
    document.getElementById("toast-container")?.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
}

