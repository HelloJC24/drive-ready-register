
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Brain, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Question {
  id: number;
  scenario: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    scenario: "You're driving on a busy highway during rush hour when suddenly the car in front of you stops abruptly due to an accident ahead.",
    question: "What is your immediate response?",
    options: [
      { id: "a", text: "Honk your horn aggressively to express frustration", isCorrect: false },
      { id: "b", text: "Brake safely, maintain distance, and check mirrors for vehicles behind you", isCorrect: true },
      { id: "c", text: "Quickly change lanes without signaling to avoid stopping", isCorrect: false },
      { id: "d", text: "Get very close to the car ahead to pressure them to move", isCorrect: false }
    ]
  },
  {
    id: 2,
    scenario: "A pedestrian with a walking stick is slowly crossing the street at a crosswalk, and you're running late for an important appointment.",
    question: "How do you handle this situation?",
    options: [
      { id: "a", text: "Wait patiently until they completely cross, regardless of your schedule", isCorrect: true },
      { id: "b", text: "Drive slowly around them since you're in a hurry", isCorrect: false },
      { id: "c", text: "Honk to make them move faster", isCorrect: false },
      { id: "d", text: "Rev your engine to show impatience", isCorrect: false }
    ]
  },
  {
    id: 3,
    scenario: "Another driver cuts you off dangerously, almost causing an accident. You notice they're using their phone while driving.",
    question: "What is the most appropriate response?",
    options: [
      { id: "a", text: "Follow them closely and honk repeatedly to teach them a lesson", isCorrect: false },
      { id: "b", text: "Stay calm, maintain safe distance, and avoid confrontation", isCorrect: true },
      { id: "c", text: "Speed up to cut them off in return", isCorrect: false },
      { id: "d", text: "Roll down your window and yell at them", isCorrect: false }
    ]
  },
  {
    id: 4,
    scenario: "You're at a 4-way stop intersection and another driver who arrived after you starts moving first, clearly not following traffic rules.",
    question: "What should you do?",
    options: [
      { id: "a", text: "Speed up to assert your right of way", isCorrect: false },
      { id: "b", text: "Let them go and proceed when safe, avoiding potential conflict", isCorrect: true },
      { id: "c", text: "Block their path to force them to follow the rules", isCorrect: false },
      { id: "d", text: "Honk and gesture angrily to show they're wrong", isCorrect: false }
    ]
  },
  {
    id: 5,
    scenario: "During heavy rain, you notice your car is starting to hydroplane and lose traction on the wet road.",
    question: "What is the correct response to maintain control?",
    options: [
      { id: "a", text: "Brake hard immediately to regain control", isCorrect: false },
      { id: "b", text: "Accelerate to power through the water", isCorrect: false },
      { id: "c", text: "Ease off the accelerator, steer straight, and avoid sudden movements", isCorrect: true },
      { id: "d", text: "Turn the steering wheel sharply in the opposite direction", isCorrect: false }
    ]
  }
];

const PsychologyExam = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (questionId: number, answerId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerId }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    let correctAnswers = 0;
    questions.forEach(question => {
      const selectedAnswer = answers[question.id];
      const correctOption = question.options.find(option => option.isCorrect);
      if (selectedAnswer === correctOption?.id) {
        correctAnswers++;
      }
    });
    
    setScore(correctAnswers);
    setShowResults(true);
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const handleComplete = () => {
    if (score >= 4) {
      toast({
        title: "Congratulations!",
        description: "You have successfully passed the psychology examination and driver registration process.",
      });
    } else {
      toast({
        title: "Examination Not Passed",
        description: "You need to retake the examination. A passing score of 4 out of 5 is required.",
        variant: "destructive"
      });
    }
  };

  if (showResults) {
    const passed = score >= 4;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
                  passed ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {passed ? (
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  ) : (
                    <XCircle className="w-10 h-10 text-red-600" />
                  )}
                </div>
                <CardTitle className="text-2xl">
                  {passed ? "Examination Passed!" : "Examination Not Passed"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="space-y-4">
                  <div className="text-6xl font-bold text-primary">
                    {score}/5
                  </div>
                  <p className="text-lg text-muted-foreground">
                    {passed 
                      ? "Congratulations! You have demonstrated excellent judgment and decision-making skills."
                      : "You need a minimum score of 4 out of 5 to pass. Please review the scenarios and try again."
                    }
                  </p>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Score Breakdown:</h3>
                  <div className="space-y-2">
                    {questions.map((question) => {
                      const selectedAnswer = answers[question.id];
                      const correctOption = question.options.find(option => option.isCorrect);
                      const isCorrect = selectedAnswer === correctOption?.id;
                      
                      return (
                        <div key={question.id} className="flex items-center justify-between">
                          <span>Question {question.id}</span>
                          <span className={`flex items-center gap-1 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            {isCorrect ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                            {isCorrect ? 'Correct' : 'Incorrect'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  {!passed && (
                    <Button variant="outline" onClick={handleRetake}>
                      Retake Examination
                    </Button>
                  )}
                  <Button onClick={handleComplete} className={passed ? 'bg-green-600 hover:bg-green-700' : ''}>
                    {passed ? 'Complete Registration' : 'Continue'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const selectedAnswer = answers[question.id];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Psychology Examination</CardTitle>
              <p className="text-muted-foreground mt-2">
                Answer scenario-based questions to test your judgment and decision-making skills
              </p>
              <div className="mt-4">
                <Progress value={progress} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {questions.length} • Passing Score: 4/5
                </p>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-amber-900 mb-1">Scenario:</h3>
                    <p className="text-amber-800">{question.scenario}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
                <RadioGroup 
                  value={selectedAnswer || ""} 
                  onValueChange={(value) => handleAnswerSelect(question.id, value)}
                  className="space-y-3"
                >
                  {question.options.map((option) => (
                    <div key={option.id} className="flex items-start space-x-3">
                      <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                      <Label htmlFor={option.id} className="text-sm leading-relaxed cursor-pointer flex-1">
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                <Button 
                  onClick={nextQuestion}
                  disabled={!selectedAnswer}
                  className="px-8"
                >
                  {currentQuestion === questions.length - 1 ? "Complete Exam" : "Next Question"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PsychologyExam;
