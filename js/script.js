const refs = {
  userNav: document.querySelector(".user-nav"),
  dropdown: document.querySelector(".dropdown"),
  favorites: document.querySelector(".favorites"),
  messages: document.querySelector(".messages"),
  favoritesBtn: document.querySelector(".favorites__btn"),
  messagesBtn: document.querySelector(".messages__btn"),
};

const fetchedData = [
  {
    type: "favorites",
    arr: [
      { name: "Hotel las Palmas", img: "./img/las-palmas.jpg" },
      { name: "Ciudad Maderas", img: "./img/ciudad-maderas.jpg" },
      { name: "Xandari", img: "./img/xandari.jpg" },
      { name: "Avenido Madera", img: "./img/avenido-madera.jpg" },
    ],
  },
  {
    type: "messages",
    arr: [
      {
        username: "Nick Smith",
        avatar: "./img/user-1.jpg",
        message:
          "Guess what? Just scored a sweet last-minute deal on a beachfront villa!",
      },
      {
        username: "Mary Thomas",
        avatar: "./img/user-2.jpg",
        message: "Hey there! Just booked a cozy cabin for our weekend getaway!",
      },
      {
        username: "Alex Rodriguez",
        avatar: "./img/user-3.jpg",
        message:
          "Exciting news! Booked tickets for a spontaneous trip to Paris",
      },
      {
        username: "Jason Patel",
        avatar: "./img/user-4.jpg",
        message: "Locked in a reservation for a foodie tour next weekend",
      },
      {
        username: "Kevin Chang",
        avatar: "./img/user-5.jpg",
        message: "Just booked a charming bed & breakfast in the mountains",
      },
      {
        username: "Emily Williams",
        avatar: "./img/user-6.jpg",
        message:
          "Booked tickets for a live concert next month! It's gonna be epic.",
      },
    ],
  },
];

// DROPDOWN RENDER
fetchedData.forEach((el) => renderDropdown(el));

function renderDropdown(obj) {
  let render = "";
  const emptyText = {
    favorites: "You didn't add any hotel to the favorites.",
    messages: "Sorry. You don`t have any messages.",
  };
  const notificationNumber = `<p class='user-nav__number'>${obj.arr.length}</p>`;

  if (obj.arr.length === 0) {
    render = `<p class="dropdown__empty">${emptyText[obj.type]}</p>`;
  } else {
    render = createDropdownList(obj);
    refs[`${obj.type}Btn`].insertAdjacentHTML("beforeend", notificationNumber);
  }

  refs[obj.type].insertAdjacentHTML("beforeend", render);
}

function createDropdownList({ type, arr }) {
  const items = createItemsMarkup(arr, type);
  return `<ul class="dropdown__list">${items}</ul>`;
}

function createItemsMarkup(arr, type) {
  return arr
    .map((el) => {
      switch (type) {
        case "messages":
          return `<li class="dropdown__item">
                  <a href="#" class="dropdown__link">
                    <img src="${el.avatar}" alt="" class="dropdown__img" />
                    <div>
                      <p class="dropdown__username">${el.username}</p>
                      <p class="dropdown__message">${el.message}</p>
                    </div>
                  </a>
                </li>`;
          break;

        case "favorites":
          return `<li class="dropdown__item">
                  <a href="#" class="dropdown__link">
                    <img src="${el.img}" alt="" class="dropdown__img" loading="lazy"/>
                    <span class="dropdown__text">${el.name}</span>
                  </a>
                </li>`;
          break;

        default:
          break;
      }
    })
    .join("");
}

// USER-NAV

refs.userNav.addEventListener("click", (e) => {
  if (e.target.classList.contains("user-nav__btn")) {
    onUserNavBtnClick(e);
  }
});

function onUserNavBtnClick(event) {
  if (!event.target.classList.contains("active")) {
    removeActiveElements();
    event.stopPropagation();
    window.addEventListener("click", onWindowClick);
  }
  event.target.classList.toggle("active");
  event.target.nextElementSibling.classList.toggle("active");
}

function onWindowClick(event) {
  if (!event.target.closest(".dropdown")) {
    removeActiveElements();
    window.removeEventListener("click", onWindowClick);
  }
}

function removeActiveElements() {
  const activeElements = document.querySelectorAll(".active");
  activeElements.forEach((element) => element.classList.remove("active"));
}
