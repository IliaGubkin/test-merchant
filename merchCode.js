const cards = [
  {
    maskPan: "•••• 0199",
    paySystem: "VISA",
    bank: "GPB",
    gidCardId: "883f3c9b-4444-5555-7777-3e2c75c29999",
    iconPath: "https://{domain}/...",
  },
  {
    maskPan: "•••• 1234",
    paySystem: "MIR",
    bank: "SBERBANK",
    gidCardId: "773f3c9b-4444-5555-7777-3e2c75c29999",
    iconPath: "https://{domain}/...",
  },
  {
    maskPan: "•••• 3212",
    paySystem: "AMEX",
    bank: "SBERBANK",
    gidCardId: "5554IKn-4444-5555-7777-asdSD23r43",
    iconPath: "https://{domain}/...",
  },
];

const successUrl =
  window.location.origin +
  window.location.pathname.replace(/[^\/]*$/, "") +
  "success.html";
const errorUrl =
  window.location.origin +
  window.location.pathname.replace(/[^\/]*$/, "") +
  "error.html";

const ecoPay = new window.EcoPaySDK({
  merchId: "3af087fe-5a16-4db4-945c-cf4478fdfb66",
  mode: "popup",
  backUrlSuccess: successUrl,
  // backUrlError: errorUrl,
  environment: 'preprod',
  onCardClick: (gidCardId) => {
    console.log("Выбрана карта:", gidCardId);
    // Здесь логика мерчанта

    alert(`Выбрана карта gidCardId: ${gidCardId}`);
  },
});

const cardsList = document.getElementById("ecoPayCardsList");
const button = document.getElementById("ecoPayAddCardBtn");
button.onclick = () => ecoPay.handleAddCardClick();
// Создаем список карт
const cardsContainer = document.getElementById("ecoPayCardsList");
cardsContainer.className = "eco-pay-cards-list";

cards.forEach((card) => {
  const cardElement = document.createElement("div");
  const cardRightContainer = document.createElement("div");
  const paySystem = card.paySystem.toLowerCase() || "noPay";

  cardElement.className = "eco-pay-card";
  cardRightContainer.className = "eco-pay-card-right";

  cardElement.innerHTML = `
            <div class="eco-pay-card-left"> 
                <div class="eco-pay-card-number">${card.maskPan}</div>
            </div>
        `;

  cardRightContainer.innerHTML = `
          <img 
            src="https://ecopay-test.gorpay.online/icons/paySystem/${paySystem}.svg" 
            alt="${paySystem} icon"
            onerror="this.src='https://ecopay-test.gorpay.online/icons/paySystem/noPay.svg'"
          >
        `;

  renderDeleteButton(cardRightContainer, card.gidCardId);
  cardElement.appendChild(cardRightContainer);
  cardsContainer.appendChild(cardElement);
});

function renderDeleteButton(container, cardId) {
  const button = document.createElement("button");
  button.className = "eco-pay-delete-card-btn";
  button.onclick = (e) => {
    e.stopPropagation(); // Предотвращаем всплытие события
    ecoPay.handleDeleteCardClick(cardId);
  };
  button.innerHTML = `
        <div class="eco-pay-card-delete">
          <img src="https://ecopay-test.gorpay.online/icons/other/delete.svg" alt="delete icon"> 
        </div>
      `;
  container.appendChild(button);
}
