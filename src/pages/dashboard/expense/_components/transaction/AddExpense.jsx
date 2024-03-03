import { useState } from "react";
import * as yup from "yup";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageInput from "../../../../../components/common/_components/ImageInput";
import StickySection from "../../../../../components/common/_components/StickySection";

function AddExpense() {
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({});
  const [currency, setCurrency] = useState("eur");

  const formSchema = {
    name: yup
      .string()
      .required("Name of member is required")
      .min(3, "Too short")
      .max(50, "Too long"),
  };

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(2, "Too short")
      .max(50, "Too long"),
    currency: yup.string().required("Currency is required"),
    groups: yup
      .array()
      .of(yup.object().shape(formSchema))
      .required("Must have fields")
      .min(1, "Minimum of 1 field"),
  });

  const defaultValue = {
    name: "",
    currency: "eur",
    groups: [],
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

  const { fields, append, remove } = useFieldArray({
    name: "groups",
    control,
  });

  function addUser() {
    append({
      name: "",
      email: "",
    });
  }

  function deleteUser(index) {
    remove(index);
  }

  const handleImageChange = (selectedImage) => {
    setImageUrl(selectedImage);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const submit = (values) => {
    const newItem = { ...values, image: imageUrl };
    console.log(newItem);
    setFormData(newItem);
    console.log(formData);
  };

  function handleOptionChange(selectedOption) {
    console.log("Option choisie:", selectedOption);
  }

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
                    Ajouter une depense
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
                              {...register("name")}
                            />
                            {errors.name && (
                              <p style={{ color: "red" }}>
                                {errors.name.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-2">
                          <h5 className="flex-fill title-bold mt-10 mb-10 title-bold"></h5>
                          <div className="form-group">
                            <select
                              className="form-select form-control mb-3"
                              onChange={handleCurrencyChange}
                              {...register("currency")}
                            >
                              <option value="eur">Categorie </option>
                              <option value="usd">Alimentation</option>
                              <option value="mad">Voyage</option>
                            </select>
                            {errors.currency && (
                              <p style={{ color: "red" }}>
                                {errors.currency.message}
                              </p>
                            )}
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
                              {...register("currency")}
                            >
                              <option value="eur">Mouhcine</option>
                              <option value="usd">Imane</option>
                              <option value="mad">Hamza</option>
                            </select>
                            {errors.currency && (
                              <p style={{ color: "red" }}>
                                {errors.currency.message}
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
                              {...register("name")}
                            />
                            {errors.name && (
                              <p style={{ color: "red" }}>
                                {errors.name.message}
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
                            {errors.currency && (
                              <p style={{ color: "red" }}>
                                {errors.currency.message}
                              </p>
                            )}
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
                            Participant
                          </h5>
                        </div>
                      </div>
                      <div className="row">
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
                      </div>
                      <div className="row">
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

export default AddExpense;
