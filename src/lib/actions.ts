"use server";

import { supabase } from "./supabase";
import { resend } from "./resend";

export async function submitApplication(formData: {
    fullName: string;
    dob: string;
    institute: string;
    email: string;
    portfolio?: string;
    aboutMe: string;
}) {
    try {
        // 1. Store in Supabase
        const { error: dbError } = await supabase
            .from('applications')
            .insert([{
                full_name: formData.fullName,
                dob: formData.dob,
                institute: formData.institute,
                email: formData.email,
                portfolio: formData.portfolio,
                about_me: formData.aboutMe
            }]);

        if (dbError) throw dbError;

        // 2. Send email via Resend if configured
        if (resend) {
            // We use a professional eye-catching HTML template
            const { data: emailData, error: emailError } = await resend.emails.send({
                from: 'Menzelyano <onboarding@resend.dev>', // Change to your verified domain later
                to: ['manzelyanoboscoyouth@gmail.com'],
                subject: `New Application: ${formData.fullName}`,
                html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 20px;">
                    <div style="background: linear-gradient(to right, #ec4899, #8b5cf6); padding: 30px; border-radius: 15px; text-align: center; color: white;">
                        <h1 style="margin: 0; font-size: 24px;">New Family Member!</h1>
                        <p style="margin: 10px 0 0; opacity: 0.9;">Someone wants to join the changemakers.</p>
                    </div>
                    
                    <div style="background: white; padding: 30px; border-radius: 15px; margin-top: 20px; border: 1px solid #eee;">
                        <h2 style="color: #333; font-size: 18px; margin-top: 0; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">Applicant Details</h2>
                        
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px 0; color: #666; font-size: 14px; width: 140px;"><strong>Full Name:</strong></td>
                                <td style="padding: 10px 0; color: #333; font-size: 14px;">${formData.fullName}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #666; font-size: 14px;"><strong>Email:</strong></td>
                                <td style="padding: 10px 0; color: #333; font-size: 14px;"><a href="mailto:${formData.email}" style="color: #ec4899; text-decoration: none;">${formData.email}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #666; font-size: 14px;"><strong>Date of Birth:</strong></td>
                                <td style="padding: 10px 0; color: #333; font-size: 14px;">${formData.dob}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #666; font-size: 14px;"><strong>Institute:</strong></td>
                                <td style="padding: 10px 0; color: #333; font-size: 14px;">${formData.institute}</td>
                            </tr>
                            ${formData.portfolio ? `
                            <tr>
                                <td style="padding: 10px 0; color: #666; font-size: 14px;"><strong>Portfolio/Social:</strong></td>
                                <td style="padding: 10px 0; color: #333; font-size: 14px;"><a href="${formData.portfolio}" style="color: #ec4899; text-decoration: none;">Link</a></td>
                            </tr>
                            ` : ''}
                        </table>
                        
                        <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #f0f0f0;">
                            <h3 style="color: #333; font-size: 16px; margin-top: 0;">Motivation</h3>
                            <p style="color: #555; font-size: 14px; line-height: 1.6; background: #fcfcfc; padding: 15px; border-radius: 10px; border: 1px dashed #ddd;">
                                ${formData.aboutMe.replace(/\n/g, '<br/>')}
                            </p>
                        </div>
                    </div>
                    
                    <p style="text-align: center; font-size: 12px; color: #999; margin-top: 20px;">
                        This application was submitted via the Menzelyano Bosco Youth website.
                    </p>
                </div>
            `
            });

            if (emailError) {
                console.error("Resend Email Error:", emailError);
                // We don't throw here to avoid failing the whole request if only email fails
            }
        } else {
            console.warn("Resend API key is missing. Email notification skipped.");
        }

        return { success: true };
    } catch (error: any) {
        console.error("Submission Error:", error);
        return { success: false, error: error.message };
    }
}
