"use client";
import React from "react";
import { useState, useEffect } from "react";
import TextInput from "@/app/(dashboard)/components/TextInput";
import { AllMailServersApi } from "@/app/api/allmailserversapi";
import MailSelect from "../../components/mailSelectInput";
import { EmailSelect } from "../../components/mailSelectInput";
import { CreateWarmupApi } from "@/app/api/createwarmupapi";
import Loader1 from "../../components/Loader1";
import { useGlobalToastContext } from "@/app/contexts/GlobalToastProvider";
import { useRouter } from "next/navigation";
const CreateWarmup = () => {
  const [formFields, setFormFields] = useState({
    warmupName: "",
    mailServer: "",
    clientEmail: "",
    maxDays: "",
    startVolume: 10,
    increaseRate: "",
    dailySendLimit: "",
    autoResponderEnabled: false,
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccessToast, showErrorToast } = useGlobalToastContext();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      Number(formFields.increaseRate) < 0.1 ||
      Number(formFields.increaseRate) > 20
    ) {
      showErrorToast("Increase Rate must be between 0.1 and 20");
      return;
    }
    if (
      Number(formFields.dailySendLimit) < 200 ||
      Number(formFields.dailySendLimit) > 500
    ) {
      showErrorToast("Daily Send Limit must be between 200 and 500");
      return;
    }

    if (
      Number(formFields.startVolume) < 10 ||
      Number(formFields.startVolume) > 50
    ) {
      showErrorToast("Start Volume must be between 10 and 50");
      return;
    }
    setIsLoading(true);
    const data = {
      name: formFields.warmupName,
      mailserverId: formFields.mailServer,
      clientEmailListId: formFields.clientEmail,
      maxDays: Number(formFields.maxDays),
      startVolume: Number(formFields.startVolume),
      increaseRate: Number(formFields.increaseRate),
      dailySendLimit: Number(formFields.dailySendLimit),
      autoResponderEnabled: Number(formFields.autoResponderEnabled),
      targetOpenRate: 0.1,
      targetReplyRate: 0.1,
    };
    try {
      const response = await CreateWarmupApi(data);
      console.log(response);
      setIsLoading(false);
      showSuccessToast("Warmup Created Successfully");
      router.push("/warm-ups");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      showErrorToast("Unable to create Warmup");
    }
  };
  useEffect(() => {
    console.log(formFields);
  }, [formFields]);
  return (
    <section className="w-full h-full overflow-auto flex bg-gray-150 px-5 py-10">
      <div className="w-full h-fit flex flex-col items-center just50y-center gap-5 ">
        <form
          className="bg-white p-5 lg:p-10 rounded-3xl border-[1px] border-[#C2C2C2] w-full max-w-[60rem] flex flex-col gap-7 h-fit"
          onSubmit={handleSubmit}
        >
          {isLoading && (
            <div className="w-full h-full flex justify-center items-center">
              <Loader1 />
            </div>
          )}
          <div className="flex justify-between gap-3">
            <h3 className="text-xl text-blue font-medium">
              Enter details for Warm-up
            </h3>
          </div>
          <div className="flex gap-6 h-full">
            <div className="w-full flex flex-col gap-5">
              <TextInput
                name="warmupName"
                label="Warmup Name"
                placeholder="Warmup Name"
                value={formFields.warmupName}
                type="text"
                onChange={handleOnChange}
              />
              <MailSelect
                name="mailServer"
                label="Select Mail Server Associated with this Warmup"
                placeholder='Select A "Mail Server" List'
                setFormFields={setFormFields}
              />

              <EmailSelect
                label="Select Client Email Associated with this Warmup"
                placeholder="Select A Client Email List"
                setFormFields={setFormFields}
              />
              <TextInput
                name="maxDays"
                type="number"
                label=" Maximum Number of Days"
                placeholder="Enter the maximum number of days"
                value={formFields.maxDays}
                onChange={handleOnChange}
              />
            </div>

            <div className="w-full flex flex-col gap-5">
              <TextInput
                name="startVolume"
                label="Enter Start Volume"
                placeholder="Enter your Start Volume"
                value={formFields.startVolume}
                min={10}
                max={50}
                type="number"
                onChange={handleOnChange}
              />
              <TextInput
                name="dailySendLimit"
                label="Daily Send Limit"
                min={200}
                max={500}
                placeholder="Enter your Daily Send Limit"
                value={formFields.dailySendLimit}
                onChange={handleOnChange}
              />
              <TextInput
                label="Increase Rate (in %)"
                name="increaseRate"
                type="number"
                placeholder=" Enter your Increase Rate"
                value={formFields.increaseRate}
                onChange={handleOnChange}
              />
              {/* toggle button */}
              <div className="flex flex-col items-center gap-2">
                <input
                  type="checkbox"
                  name="autoResponderEnabled"
                  id="autoResponderEnabled"
                  checked={formFields.autoResponderEnabled}
                  disabled
                  onChange={(e) =>
                    setFormFields((prev) => ({
                      ...prev,
                      autoResponderEnabled: e.target.checked,
                    }))
                  }
                />

                <label htmlFor="autoResponderEnabled">
                  Enable Auto Responder
                </label>

                <p className="text-xs text-gray-500">
                  (This will send an automatic reply to all emails)
                </p>
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-5 md:px-10 py-2 bg-blue rounded-md text-white w-fit disabled:opacity-50 disabled:cursor-default disabled:select-none disabled:event-none"
            disabled={
              !formFields.warmupName ||
              !formFields.mailServer ||
              !formFields.clientEmail ||
              !formFields.maxDays ||
              !formFields.startVolume ||
              !formFields.dailySendLimit ||
              !formFields.increaseRate || isLoading
            }
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateWarmup;
