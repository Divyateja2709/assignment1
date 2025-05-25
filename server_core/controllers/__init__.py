# Import the router from the PDF upload module and rename it for clarity
from .upload_pdf import router as upload_pdf_router

# Import the router that handles question answering
from .ask_question import router as ask_question_router

# Import the router for handling query/answer history (if implemented)
from .history import router as history_router
