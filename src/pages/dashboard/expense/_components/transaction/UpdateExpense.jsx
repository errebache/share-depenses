import { useState } from "react";
import * as yup from "yup";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageInput from "../../../../../components/common/_components/ImageInput";
import StickySection from "../../../../../components/common/_components/StickySection";

function UpdateExpense() {
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({});
  const [currency, setCurrency] = useState("eur");
  const [amount, setAmount] = useState(0);
  const [participants, setParticipants] = useState([
    { name: "mouhcine", amount: 0 },
    { name: "imane", amount: 0 },
    { name: "hamza", amount: 0 }
  ]);

  const formSchema = {
    name: yup
      .string()
      .required("Name of member is required")
      .min(3, "Too short")
      .max(50, "Too long"),
  };

  const schema = yup.object().shape({
    description: yup
      .string()
      .required("Description is required")
      .min(2, "Too short")
      .max(50, "Too long"),
    paidBy: yup.string().required("Payer is required"),
    amount: yup
      .number()
      .typeError("Amount must be a number")
      .required("Amount is required")
      .positive("Amount must be positive"),
    splitAmong: yup.array().of(
      yup.object().shape({
        name: yup
          .string()
          .required("Participant name is required")
          .min(3, "Too short")
          .max(50, "Too long"),
        amount: yup
          .number()
          .typeError("Amount must be a number")
          .required("Amount is required")
          .positive("Amount must be positive")
      })
    )
  });

  const defaultValue = {
    description: "",
    amount: 0,
    list: "",
    currency: "eur",
    splitAmong: [],
    image: "",
    categorie: "",
    createdAt: ""
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, submitCount },
    reset,
    setError,
    clearErrors,
    setFocus,
  } = useForm({
    defaultValues: defaultValue,
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleImageChange = (selectedImage) => {
    setImageUrl(selectedImage);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleTotalAmountChange = (e) => {
    const newTotalAmount = parseFloat(e.target.value);
    console.log(newTotalAmount);
    setAmount(newTotalAmount);

    const remainingParticipants = participants.length - 1;
    const amountPerParticipant = newTotalAmount / remainingParticipants;

    const updatedParticipants = participants.map((participant, index) => {
      if (index === 0) {
        return participant; // Ignorer le premier participant
      } else {
        return { ...participant, amount: amountPerParticipant };
      }
    });

    setParticipants(updatedParticipants);
  };

  const handleChangeParticipantAmount = (index, value) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index].amount = value;
    setParticipants(updatedParticipants);
  };

  const submit = (data) => {
    const newItem = { ...data, image: imageUrl };
    console.log(newItem);
  };

  return (
    <div className="row">
      <div className="col-lg-8 col-md-12 col-12 mx-auto">
        <div className="content-page">
          <form
            className="section general-info"
            onSubmit={handleSubmit(submit)}
          >
            <div className="info">
              <div className="row">
                <div className="ccol-lg-11 mx-auto">
                  <h4 className="text-center mt-10 mb-10">
                    Modifier une depense
                  </h4>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-11 mx-auto">
                  <div className="row">
                    <div className="form">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <h5 className="flex-fill text-bold mt-10 mb-10 title-bold">
                              Description
                            </h5>
                            <input
                              type="text"
                              className="form-control mb-3"
                              placeholder="depense"
                              {...register("description")}
                            />
                            {errors.description && (
                              <p style={{ color: "red" }}>
                                {errors.description.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-3">
                          <h5 className="flex-fill title-bold mt-10 mb-10 title-bold"></h5>
                          <div className="form-group">
                            <select
                              className="form-select form-control mb-3"
                              onChange={handleCurrencyChange}
                              {...register("categorie")}
                            >
                              <option value="Categorie">Categorie </option>
                              <option value="Alimentation">Alimentation</option>
                              <option value="Voyage">Voyage</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <h5 className="flex-fill text-bold mt-10 mb-10 title-bold">
                            choose puyer
                          </h5>
                          <div className="form-group">
                            <select
                              className="form-select form-control mb-3"
                              onChange={handleCurrencyChange}
                              {...register("paidBy")}
                            >
                              <option value="userId_1">Mouhcine</option>
                              <option value="userId_2">Imane</option>
                              <option value="userId_3">Hamza</option>
                            </select>
                            {errors.paidBy && (
                              <p style={{ color: "red" }}>
                                {errors.paidBy.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-3">
                          <div className="form-group">
                            <h5 className="flex-fill text-bold mt-10 mb-10 title-bold">
                              Amount
                            </h5>
                            <input
                              type="text"
                              className="form-control mb-3"
                              placeholder="Amount"
                              onChange={handleTotalAmountChange}
                              {...register("amount")}
                            />
                            {errors.amount && (
                              <p style={{ color: "red" }}>
                                {errors.amount.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="form-group">
                            <h5 className="flex-fill text-bold mt-10 mb-10 title-bold"></h5>
                            <select
                              className="form-select form-control mb-3"
                              onChange={handleCurrencyChange}
                              {...register("currency")}
                            >
                              <option value="eur">EUR (€)</option>
                              <option value="usd">USD ($)</option>
                              <option value="mad">MAD</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <h5 className="flex-fill text-bold mt-10 mb-10 title-bold"></h5>{" "}
                            <input
                              type="date"
                              id="dateInput"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-md-2 text-center">
                          <ImageInput
                            format={false}
                            size="sm"
                            className="mt-30 ml-5"
                          />
                        </div>
                      </div>
                      <div className="row"></div>
                      <div className="row">
                        <div className="col-md-12">
                          <h5 className="flex-fill text-bold mt-20 mb-20 ">
                            Participants
                          </h5>
                        </div>
                      </div>
                      {/* <div className="row">
                        <div className="col-md-5">
                          <div className="form-group">
                            <label>Mouhcine</label>
                            <input
                              type="text"
                              className="form-control mb-3"
                              placeholder="30"
                              {...register("name")}
                            />
                            {errors.name && (
                              <p style={{ color: "red" }}>
                                {errors.name.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className="form-group">
                            <label>Imane</label>
                            <input
                              type="text"
                              className="form-control mb-3"
                              placeholder="20"
                              {...register("name")}
                            />
                            {errors.name && (
                              <p style={{ color: "red" }}>
                                {errors.name.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div> */}
                      <div className="row">            
                      {participants.map((participant, index) => (
                          <div key={index} className="col-md-5">
                            <div className="form-group">
                              <label>{participant.name}</label>
                              <input
                                type="number"
                                className="form-control mb-3"
                                value={participant.amount}
                                onChange={(e) => handleChangeParticipantAmount(index, parseFloat(e.target.value))}
                              />
                              {/* Error handling */}
                            </div>
                          </div>
                      ))}
                        {/* <div className="col-md-5">
                          <div className="form-group">
                            <label>Mouhcine</label>
                            <input
                              type="text"
                              className="form-control mb-3"
                              placeholder="30"
                              {...register("name")}
                            />
                            {errors.name && (
                              <p style={{ color: "red" }}>
                                {errors.name.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className="form-group">
                            <label>Imane</label>
                            <input
                              type="text"
                              className="form-control mb-3"
                              placeholder="20"
                              {...register("name")}
                            />
                            {errors.name && (
                              <p style={{ color: "red" }}>
                                {errors.name.message}
                              </p>
                            )}
                          </div>
                        </div> */}
                      </div>
                      <StickySection offset={5}>
                        <div className="row">
                          <div className="col-md-12 text-center">
                            <button
                              disabled={isSubmitting}
                              className="btn btn-primary my-2 mx-3"
                            >
                              Sauvegarder
                            </button>
                            <button
                              disabled={isSubmitting}
                              className="btn btn-border my-2"
                            >
                              Annuler
                            </button>
                          </div>
                        </div>
                      </StickySection>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateExpense;
