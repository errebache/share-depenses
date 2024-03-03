
import React from "react";
import alimentation from "/images/icons/basket.png";
import assurance from "/images/icons/insurance.png";
import divertissement from "/images/icons/entertainment.png";
import logement from "/images/icons/bed.png";
import loyer_charges from "/images/icons/home.png";
import restaurant_bar from "/images/icons/restaurant.png";
import shopping from "/images/icons/shopping.png";
import soin_sante from "/images/icons/health.png";
import transport from "/images/icons/transport.png";
import autre from "/images/icons/other.png";


export const categories = [
    { value: "alimentation", text: "Alimentation", icon: alimentation },
    { value: "assurance", text: "Assurance", icon: assurance},
    { value: "divertissement", text: "Divertissement", icon: divertissement},
    { value: "logement", text: "Logement", icon: logement},
    { value: "loyer_charges", text: "Loyer & charges", icon: loyer_charges},
    { value: "restaurant_bar", text: "Restaurant & bar", icon: restaurant_bar},
    { value: "shopping", text: "Shopping", icon: shopping},
    { value: "soin_sante", text: "Soin de santé", icon: soin_sante},
    { value: "transport", text: "Transport", icon: transport},
    { value: "autre", text: "Autre", icon: autre},
  ];
