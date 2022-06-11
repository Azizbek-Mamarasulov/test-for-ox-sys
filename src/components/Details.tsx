import { Alert, Button } from "antd";
import { useNavigate } from "react-router-dom";

export function DetailsForThirdTask() {
  const navigate = useNavigate();

  const goSecondTask = () => navigate("/search");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Alert message="Bu birinchi vazifa" />
      <Alert message="Axios, Ant Design, React router dom packagelaridan foydalanilgan" />
      <Alert message="Context API dan foydalanilgan" />
      <Alert
        message="2-vazifa"
        type="success"
        showIcon
        action={
          <Button size="small" type="ghost" danger onClick={goSecondTask}>
            Ko'rish uchun bu yerni bosing
          </Button>
        }
      />
      <br />
    </div>
  );
}

export function DetailsForFouthTask() {
  const navigate = useNavigate();

  const goSecondTask = () => navigate("/");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Alert message="Bu ikkinchi vazifa" />
      <Alert
        type="error"
        message="Qayta fetch qilmasdan qidirish funksiyasini qo'shish topshirilgan. Bu yerda search funksiyasidan foydalanilganda qayta fetch qilinmaydi."
      />
      <Alert message="Context API yoki Redux va shunga o'xshash yo'llar bilan task 1da fetch qilingan ma'lumotlarni bu yerga olib o'tish imkoni mavjud edi. Lekin vazifada search qilinganda qayta fetch qilinmasligi kerakligi topshirilganligi uchun, search qilinganda qayta fetch qilmasdan qidiriladigan qilib qo'yildi" />
      <Alert
        type="error"
        message="Search va Sort qilish funksiyasi hech qanday qo'shimcha packagelarsiz bajarilgan."
      />
      <Alert
        message="1-vazifa"
        type="success"
        showIcon
        action={
          <Button size="small" type="ghost" danger onClick={goSecondTask}>
            Ko'rish uchun bu yerni bosing
          </Button>
        }
      />
      <br />
    </div>
  );
}
