import PyPDF2
import pandas as pd

def extract_text_from_pdf(pdf_path):
    pdf_text = []
    with open(pdf_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        for page_num in range(len(reader.pages)):
            page = reader.pages[page_num]
            pdf_text.append(page.extract_text())
    return pdf_text

pdf_path = "D:\\B2.1.1_Uchebnaya(proektnaya)_praktika.pdf"

pdf_text = extract_text_from_pdf(pdf_path)

start_keyword = "ТИПОВЫЕ ВОПРОСЫ ПО ПРАКТИКЕ"
end_keyword = "4. ВЫПОЛНЕНИЕ ИНДИВИДУАЛЬНОГО ЗАДАНИЯ"

questions_section = []
record = False
for page in pdf_text:
    for line in page.split('\n'):
        if start_keyword in line:
            record = True
        if record:
            if end_keyword[-1] in line:
                record = False
                break
            questions_section.append(line)

questions_text = "\n".join(questions_section)

questions = [line for line in questions_text.split("\n") if line.strip()]

questions_df = pd.DataFrame(questions, columns=["Типовые вопросы по практике"])
excel_path = "D:\\pr.xlsx"
questions_df.to_excel(excel_path, index=False)

print(f"Вопросы успешно сохранены в файл: {excel_path}")
