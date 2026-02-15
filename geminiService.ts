
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "./constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIRecommendation = async (userPrompt: string) => {
  const productContext = PRODUCTS.map(p => 
    `${p.name} (หมวดหมู่ ${p.category}): ${p.description} - ราคา: ${p.price} บาท`
  ).join('\n');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `คุณเป็นผู้เชี่ยวชาญด้านแฟชั่นและสไตลิสต์ส่วนตัวของร้าน "DBT Company" ร้านเสื้อผ้าแฟชั่นออนไลน์ชั้นนำ
      
      รายการสินค้าของเรามีดังนี้:
      ${productContext}
      
      คำถามจากลูกค้า: "${userPrompt}"
      
      โปรดแนะนำเสื้อผ้าที่เฉพาะเจาะจงจากรายการของเรา ตอบเป็นภาษาไทยด้วยความเป็นมิตรและมีสไตล์ ให้คำแนะนำเรื่องการแมตช์ชุด (Styling tips) อย่างมืออาชีพ อธิบายว่าทำไมถึงเหมาะกับความต้องการของลูกค้า หากแนะนำสินค้า ให้ระบุชื่อเต็มและราคาเสมอในนามของ DBT Company`,
      config: {
        temperature: 0.8,
        topP: 0.85,
      }
    });

    return response.text || "ขออภัยค่ะ ฉันไม่สามารถวิเคราะห์สไตล์ให้ได้ในขณะนี้ ลองพิมพ์ความต้องการใหม่นะคะ";
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "สไตลิสต์ AI ของ DBT Company ติดภารกิจชั่วคราว เชิญเลือกชมคอลเลกชันใหม่ล่าสุดด้วยตนเองก่อนได้เลยค่ะ!";
  }
};
