import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { leadId, name, email, phone, description, model, problem, priceRange, diagnosis, imageUrls } = await req.json();

    const emailHtml = `
      <h1>New MacBook Repair Lead!</h1>
      <p><strong>Lead ID:</strong> ${leadId}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Model:</strong> ${model}</p>
      <p><strong>Problem Category:</strong> ${problem}</p>
      <p><strong>Specific Problem:</strong> ${diagnosis}</p>
      <p><strong>Estimated Price Range:</strong> ${priceRange}</p>
      <p><strong>Customer Description:</strong></p>
      <p>${description || 'No additional description provided.'}</p>
      ${imageUrls && imageUrls.length > 0 ? `
        <p><strong>Attached Images:</strong></p>
        <ul>
          ${imageUrls.map((url: string) => `<li><a href="${url}">${url}</a></li>`).join('')}
        </ul>
      ` : ''}
      <p>Please contact the customer as soon as possible.</p>
    `;

    const { data, error } = await resend.emails.send({
      from: 'TekRenewed <sales@tekrenewed.co.uk>', // Ensure 'tekrenewed.co.uk' is a verified domain in Resend
      to: ['sales@tekrenewed.co.uk'],
      subject: `New MacBook Repair Lead: ${leadId}`,
      html: emailHtml,
    });

    if (error) {
      console.error({ error });
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in send-email API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}