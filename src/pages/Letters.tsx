import { useEffect, useState } from 'react';
import { Mail, Sparkles, Send, Loader2 } from 'lucide-react';
import { api, Letter } from '@/services/api';
import { Button } from '@/components/ui/button';
import Badge from '@/components/Badge';

const Letters = () => {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [generatedReply, setGeneratedReply] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Form state for new letter
  const [newChildName, setNewChildName] = useState('');
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchLetters = async () => {
      setIsLoading(true);
      const data = await api.getLetters();
      setLetters(data);
      setIsLoading(false);
    };
    fetchLetters();
  }, []);

  const handleGenerateReply = async () => {
    if (!selectedLetter) return;
    
    setIsGenerating(true);
    setGeneratedReply('');
    
    const reply = await api.generateMagicReply(
      selectedLetter.childName, 
      selectedLetter.message
    );
    
    setGeneratedReply(reply);
    setIsGenerating(false);
  };

  const handleQuickReply = async () => {
    if (!newChildName || !newMessage) return;
    
    setIsGenerating(true);
    setGeneratedReply('');
    
    const reply = await api.generateMagicReply(newChildName, newMessage);
    
    setGeneratedReply(reply);
    setIsGenerating(false);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-8 w-48" />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="skeleton h-96" />
          <div className="skeleton h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-2">
          <Mail className="h-8 w-8 text-primary" />
          Letters & AI Assistant
        </h1>
        <p className="text-muted-foreground mt-1">
          Read children's letters and generate magical replies with AI
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Letters List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Incoming Letters</h2>
          
          {letters.map((letter, index) => (
            <div 
              key={letter.id}
              onClick={() => {
                setSelectedLetter(letter);
                setGeneratedReply('');
              }}
              className={`rounded-2xl bg-card border p-6 cursor-pointer card-hover animate-fade-in ${
                selectedLetter?.id === letter.id 
                  ? 'border-primary ring-2 ring-primary/20' 
                  : 'border-border'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-gold flex items-center justify-center text-lg">
                    ✉️
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{letter.childName}</h3>
                    <p className="text-xs text-muted-foreground">{letter.receivedDate}</p>
                  </div>
                </div>
                <Badge variant={letter.replied ? 'nice' : 'gold'}>
                  {letter.replied ? '✅ Replied' : '⏳ Pending'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {letter.message}
              </p>
            </div>
          ))}
        </div>

        {/* Reply Generator */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Magic Reply Generator ✨</h2>
          
          {/* Quick Reply Form */}
          <div className="rounded-2xl bg-card border border-border p-6 animate-fade-in">
            <h3 className="font-medium text-foreground mb-4">Write to any child</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Child's Name</label>
                <input
                  type="text"
                  value={newChildName}
                  onChange={(e) => setNewChildName(e.target.value)}
                  placeholder="Enter child's name..."
                  className="w-full rounded-xl bg-muted/50 border border-border py-2 px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Their Message</label>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Paste the child's letter here..."
                  rows={4}
                  className="w-full rounded-xl bg-muted/50 border border-border py-2 px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>
              <Button 
                className="btn-christmas rounded-xl w-full"
                onClick={handleQuickReply}
                disabled={isGenerating || !newChildName || !newMessage}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating Magic...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Magic Reply ✨
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Selected Letter Reply */}
          {selectedLetter && (
            <div className="rounded-2xl bg-card border border-border p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-foreground">
                  Reply to {selectedLetter.childName}
                </h3>
                <Button 
                  size="sm"
                  className="btn-gold rounded-lg"
                  onClick={handleGenerateReply}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-1" />
                      Generate
                    </>
                  )}
                </Button>
              </div>
              
              <div className="p-4 rounded-xl bg-muted/50 text-sm text-muted-foreground mb-4">
                <p className="font-medium text-foreground mb-1">Original Letter:</p>
                {selectedLetter.message}
              </div>
            </div>
          )}

          {/* Generated Reply */}
          {(isGenerating || generatedReply) && (
            <div className="rounded-2xl bg-gradient-forest border border-secondary p-6 text-secondary-foreground animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5" />
                <h3 className="font-semibold">Santa's Magic Reply</h3>
              </div>
              
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="text-4xl mb-4 animate-bounce-gentle">❄️</div>
                  <p className="text-secondary-foreground/80">Sprinkling Christmas magic...</p>
                  <div className="mt-4 flex gap-2">
                    {[...Array(3)].map((_, i) => (
                      <div 
                        key={i}
                        className="h-2 w-2 rounded-full bg-secondary-foreground/50 animate-bounce"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {generatedReply}
                  </div>
                  <div className="flex gap-2 pt-4 border-t border-secondary-foreground/20">
                    <Button className="flex-1 bg-secondary-foreground/20 hover:bg-secondary-foreground/30 text-secondary-foreground rounded-xl">
                      <Send className="h-4 w-4 mr-2" />
                      Send Reply
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="text-secondary-foreground hover:bg-secondary-foreground/10 rounded-xl"
                      onClick={() => setGeneratedReply('')}
                    >
                      Regenerate
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Letters;
