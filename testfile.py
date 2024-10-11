import pandas as pd
from datasets import Dataset
from transformers import (
    T5ForConditionalGeneration,
    T5Tokenizer,
    Trainer,
    TrainingArguments,
)

# Load the dataset (replace with actual file location)
df = pd.read_parquet("hf://datasets/brucewayne0459/Skin_diseases_and_care/data/train-00000-of-00001.parquet")  # Fix the dataset loading issue here

# Preview the dataset to ensure it has the correct columns
print(df.head())

# Make sure your dataset has columns 'Topic' and 'Information'
# If not, rename them accordingly:
# df = df.rename(columns={'your_input_column': 'Topic', 'your_output_column': 'Information'})

# Convert the pandas DataFrame to Hugging Face Dataset
dataset = Dataset.from_pandas(df)

# Load the tokenizer and model (using a small pre-trained T5 model for text-to-text tasks)
tokenizer = T5Tokenizer.from_pretrained('t5-small')
model = T5ForConditionalGeneration.from_pretrained('t5-small')

# Tokenize the dataset
def tokenize_function(examples):
    # Tokenize both input and output text
    model_inputs = tokenizer(examples['Topic'], max_length=128, truncation=True, padding='max_length')
    # Tokenize the target (output text)
    labels = tokenizer(examples['Information'], max_length=128, truncation=True, padding='max_length')
    model_inputs['labels'] = labels['input_ids']
    return model_inputs

# Apply tokenization to the dataset
tokenized_dataset = dataset.map(tokenize_function, batched=True)

# Set the format for PyTorch
tokenized_dataset.set_format(type='torch', columns=['input_ids', 'attention_mask', 'labels'])

# Split the dataset into train and eval sets
train_dataset = tokenized_dataset.shuffle().select(range(int(0.8 * len(tokenized_dataset))))
eval_dataset = tokenized_dataset.shuffle().select(range(int(0.8 * len(tokenized_dataset)), len(tokenized_dataset)))

# Define training arguments
training_args = TrainingArguments(
    output_dir='./results',          # output directory
    num_train_epochs=3,              # number of training epochs
    per_device_train_batch_size=8,   # batch size for training
    per_device_eval_batch_size=16,   # batch size for evaluation
    logging_dir='./logs',            # directory for storing logs
)

# Define the trainer
trainer = Trainer(
    model=model,                         # the instantiated 🤗 Transformers model to be trained
    args=training_args,                  # training arguments, defined above
    train_dataset=train_dataset,         # training dataset
    eval_dataset=eval_dataset            # evaluation dataset
)

# Train the model
trainer.train()

# Save the trained model
model.save_pretrained('./model')
tokenizer.save_pretrained('./model')

# Test the model with an input
def generate_text(Topic):
    # Tokenize the input
    inputs = tokenizer(Topic, return_tensors="pt", max_length=128, truncation=True)
    
    # Generate output using the model
    outputs = model.generate(**inputs, max_length=128, num_beams=4, early_stopping=True)
    
    # Decode the generated output
    return tokenizer.decode(outputs[0], skip_special_tokens=True)

# Example test case (replace this with your input)
Topic = "Describe the care needed for acne."
Information = generate_text(Topic)
print(f"Generated Output: {Information}")
