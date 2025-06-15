'use server'
const baseUrl =process.env.NEXT_PUBLIC_BACKEND_URL;
export const SendMail = async ( payload :{name:string, email:string, message:string}) => {

  try {
    const res = await fetch(`${baseUrl}/user/send-mail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};